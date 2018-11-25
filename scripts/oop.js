"use strict";

var player = {
	gender: false,
	move: false,
	victPts: 0,
	fleet: ["Бригантина", "Фрегат", "Галеон"],
	ship: {
		object: plrShip,
		name: false,
		direction: "top",
		movePts: 0,
		evasion: 0,
		guns: {
			left: [],
			right: [],
			top: [],
			bottom: []
		},
		reloading: []
	},
	hand: [],
	init: function(collection) {
		start.style.display = "none";
		dialog.style.display = "block";
		return new Promise(function(resolve) {
			for (let i = 0; i < collection.length; i++) {
				let id = collection[i].id;
				document.getElementById(id).addEventListener('click', function() {
					player.gender = id;
					return resolve();
				});
			}
		});
	},
	renderShip: function() {
		this.ship.object.getElementsByClassName("ship")[0].src = "images/" + this.ship.name + "1.jpg";
		this.ship.object.style.display = "block";
	},
	renderStrata: function() {
		for (let i = 0; i < this.hand.length; i++) {
			let strata = document.createElement("img"), self = this, that = this.hand[i];
			strata.className = "strata";
			strata.src = "images/" + that.id + ".jpg";
			hand.appendChild(strata);
			if (that.active) { // здесь навешивать только инит по клику, класс инит добавлять только после проверки либо в начале раунда
				strata.classList.add("init");
				strata.addEventListener('click', useStrata.bind(self, that.id));
			} else if (that.hasOwnProperty('init')) that.init(strata, self);
		}
		showStrata.style.display = "block";
		showStrata.onclick = strataCarousel;
	},
	shipChoice: function() {
		let text = (this.fleet.length != 1) ? "<p>Выберите корабль:<p>": "<p>У вас остался последний корабль:<p>", self = this;
		dialog.innerHTML = text;
		return new Promise(function(resolve) {
			for (let i = 0; i < player.fleet.length; i++) {
				let shipAvlbl = document.createElement("button");
				shipAvlbl.innerHTML = self.fleet[i];
				shipAvlbl.addEventListener('click', function() {
					self.ship.name = (self.fleet.length != 1) ? self.fleet.splice(i, 1)[0] : self.fleet[i];
					self.renderShip();
					game.loadArms.call(self);
					return resolve();
				});
				dialog.appendChild(shipAvlbl);
			}
		});
	},
	chooseDirection: function() {
		let Left = document.createElement("button");
		Left.innerHTML = "повернуть влево";
		Left.addEventListener('click', function() {
			game.changeCourse.call(player, true);
		});
		let Right = document.createElement("button");
		Right.innerHTML = "повернуть вправо";
		Right.addEventListener('click', function() {
			game.changeCourse.call(player, false);
		});
		let ready = document.createElement("button");
		ready.innerHTML = "разместить корабль";
		dialog.innerHTML = "<p>Выберите начальное направление корабля<p>";
		dialog.appendChild(Left);
		dialog.appendChild(Right);
		dialog.appendChild(ready);
		return new Promise(function(resolve) {
			ready.addEventListener('click', function() {
				dialog.style.display = "none";
				computer.init();
				game.loadArms.call(computer);
				game.setArms.call(computer);
				return resolve();
			});
		});
	}
},
computer = {
	gender: false,
	move: false,
	victPts: 0,
	fleet: ["Бригантина", "Фрегат", "Галеон"],
	ship: {
		object: oppShip,
		name: false,
		direction: "top",
		movePts: 0,
		evasion: 0,
		guns: {
			left: [],
			right: [],
			top: [],
			bottom: []
		},
		reloading: []
	},
	hand: [],
	init: function() {
		if (!this.gender) this.gender = random(0, 1) ? "male" : "female";
		this.ship.name = this.fleet.splice(random(0, this.fleet.length - 1), 1)[0];
		this.render();
	},
	render: function() {
		portretOpp.src = "images/" + this.gender + ".jpg";
		portretOpp.style.display = "block";
		this.ship.object.getElementsByClassName("ship")[0].src = "images/" + this.ship.name + "2.jpg";
		this.ship.object.style.display = "block";
	}
},
game = {
	round: 0,
	roundEnd: true,
	wind: "",
	distance: true,
	PlayTheGame: function() {
		console.log("GameStart");
		let self = this, playGame = function() {
			return self.roundStart.call(self).then( self.roundPlay.bind(self) ).then(function() {
				self.clean();
				return self.PlayTheGame();
			});
		};
		if (player.victPts == 2 || computer.victPts == 2) return this.GameOver();
		this.round++;
		if (this.round == 1) return this.init().then(playGame);
		else return playGame();
	},
	GameOver: function() {
		if (player.victPts == 2) dialog.innerHTML = "Победа!!!";
		else dialog.innerHTML = "Поражение...";
	},
	clean: function() {
		console.log("cleaning");
		let cleaning = function(that) {
			let gun = that.ship.object.getElementsByTagName("div");
			that.ship.object.style.display = "none";
			that.ship.object.style.transform = "rotate(0)";
			that.ship.direction = "top";
			that.ship.evasion = 0;
			that.ship.movePts = 0;
			that.hand = [];
			for (let side in that.ship.guns) that.ship.guns[side] = [];
			for (let i = gun.length - 1; i >= 0; i--) that.ship.object.removeChild(gun[i]);
		}, btn = document.getElementById("showStrata");
		hand.innerHTML = "";
		hand.appendChild(btn);
		if (!this.distance) this.move();
		compas.style.display = "none";
		cleaning(player);
		cleaning(computer);
	},
	init: function() {
		let self = this;
		let gender = new Promise(function(resolve) {
			play.addEventListener('click', function() {
				player.init( document.getElementsByClassName("gender") ).then(function() {return resolve();});
			});
		});
		return new Promise(function(resolve) {
			gender.then( self.firstMove.bind(self) ).then(function() {return resolve();});
		});
	},
	firstMove: function() {
		dialog.innerHTML = "<p>Бросим кости и узнаем, кто ходит первый!<p>";
		for (let i = 0; i < 2; i++) {
			let dice = document.createElement("img");
			dice.className = "dices";
			dice.src = "images/dice.gif";
			dice.style.display = "block";
			dialog.appendChild(dice);
		}
		return new Promise(function(resolve) {
			let roll = document.createElement('button');
			roll.innerHTML = "Бросить!";
			roll.addEventListener('click', function() {
				if ( game.checkFirstMove.call(roll) ) return resolve();
			});
			dialog.appendChild(roll);
		});
	},
	checkFirstMove: function() {
		if (!player.move && !computer.move) {
			let numbers = game.rollDice( document.getElementsByClassName("dices") );
			if (numbers[0] != numbers[1]) {
				if (numbers[0] > numbers[1]) {
					dialog.firstChild.innerHTML = "Гром и молния! Мой ход!";
					computer.move = true;
				}
				else {
					dialog.firstChild.innerHTML = "Тысяча тухлых моллюсков!!! Твой ход!";
					player.move = true;
				}
				this.innerHTML = "Далее";
				return false;
			} else return false;
		} else return true;
	},
	rollDice: function(dices) {
		let value = [];
		for (let i = 0; i < dices.length; i++) {
			let rand = random(1, 6);
			value.push(rand);
			dices[i].src = "images/" + rand + ".png";
		}
		return value;
	},
	roundStart: function() {
		console.log("start");
		let self = this;
		this.roundEnd = false;
		this.takeStrata();
		player.renderStrata();
		trigger([strataChange]);
		return new Promise(function(resolve) {
			player.shipChoice().then(function() {
				self.setArms.call(player);
				player.chooseDirection().then(function() {
					return resolve();
				});
			});
		});
	},
	roundPlay: function() {
		let self = this, that = player.move ? player : computer;
		this.wind = this.changeWind();
		that.ship.reloading = [];
		switch(that.ship.name) {
			case "Бригантина": that.ship.movePts++;
			case "Фрегат": that.ship.movePts++;
			default: that.ship.movePts++;
		}
		trigger([permanent]);
		/*if (that == computer) {
			if (computer.ship.name == "Галеон") return AI().then(function() {
				self.changeMove();
				return self.roundPlay();
			});
			else {
				alert("Ход компьютера пропускается, минимальная логика есть только для галеона.");
				that.ship.movePts = 0;
				self.changeMove();
				return self.roundPlay();
			}
		} else */
		alert(player.move ? "Ход игрока" : "Ход компьютера");
		return this.makeAction.call(that).then(function() {
			if (self.roundEnd) return new Promise(function(resolve) {
				let btn = document.createElement("button");
				btn.innerHTML = "Далее";
				btn.style.display = "block";
				dialog.innerHTML = self.round + " раунд завершен.<br>Компьютер " + computer.victPts + ":" + player.victPts + " Игрок";
				dialog.appendChild(btn);
				dialog.style.display = "block";
				btn.onclick = function() {
					return resolve();
				};
			});
			else {
				self.changeMove();
				return self.roundPlay();
			}
		});
	},
	takeStrata: function() {
		let deck = [], playerTurn = player.move ? true : false;
		for (let i = stratagems.length - 1; i >= 0; i--) deck.push(stratagems[i]);
		deck.sort(compareRandom);
		// @todo: победивший в прошлом раунде берет 7 карт стратагем
		while(player.hand.length < 6 || computer.hand.length < 6) {
			if (playerTurn) {
				playerTurn = false;
				player.hand.push(deck.shift());
			} else {
				playerTurn = true;
				computer.hand.push(deck.shift());
			}
		}
	},
	makeAction: function() {
		let self = game, that = this, cost = self.renderControl(this.ship.movePts),
		moveOver = function() {
			if (!that.ship.movePts || self.roundEnd) {
				return new Promise(function(resolve) {
					return resolve();
				});
			} else return self.makeAction.call(that);
		},
		action = new Promise(function(resolve) {
			self.makeMove.apply(that, cost).then(function() {
				trigger([permanent, maneuver]);
				return resolve();
			});
			self.closeCombat().then(function() {
				--that.ship.movePts;
				return resolve();
			});
			self.salvo.call(that).then(function() {
				--that.ship.movePts;
				that.ship.reloading.push(that.ship.direction);
				return resolve();
			});
		});
		if (computer.move) AI();
		return action.then(function() {
			return moveOver();
		});
	},
	makeMove: function(fCost, rCost, bCost, lCost) {
		let self = game, that = this;
		return new Promise(function(resolve) {
			move.onclick = function() {
				that.ship.movePts -= fCost;
				self.deactivation();
				self.move();
				return resolve();
			};
			turnRight.onclick = function() {
				that.ship.movePts -= rCost;
				self.deactivation();
				self.changeCourse.call(that, false);
				return resolve();
			};
			turnAround.onclick = function() {
				that.ship.movePts -= bCost;
				self.deactivation();
				self.changeCourse.call(that, true);
				self.changeCourse.call(that, true);
				return resolve();
			};
			turnLeft.onclick = function() {
				that.ship.movePts -= lCost;
				self.deactivation();
				self.changeCourse.call(that, true);
				return resolve();
			};
		});
	},
	closeCombat: function() {
		let plrPower = this.getTotalCrew.call(player.ship.guns),
			oppPower = this.getTotalCrew.call(computer.ship.guns),
			self = this, defend = player.move ? false : true;
		return new Promise(function(resolve) {
			grapple.onclick = function() {
				self.roundEnd = true;
				self.deactivation();
				self.renderGrapple().then(function(btn) {
					let dices = self.rollDice(document.getElementsByClassName("grappleDices"));
					for (let i = 0; i < dices.length; i++) {
						if (i < 2) oppPower += dices[i];
						else plrPower += dices[i];
					}
					if (defend) oppPower >= plrPower ? computer.victPts++ : player.victPts++;
					else plrPower >= oppPower ? player.victPts++ : computer.victPts++;
					btn.onclick = function() {
						return resolve();
					};
				});
			};
		});
	},
	salvo: function() {
		let self = game, that = this;
		return new Promise(function(resolve) {
			fire.onclick = function() {
				self.deactivation();
				self.renderFire.call(that).then(function(result) {
					result.onclick = function() {
						dialog.style.display = "none";
						return resolve();
					};
				});
			};
		});
	},
	fireResult: function(salvo) {
		let result = document.createElement("p"), kills = 0, wounds = 0, index = 0, msg = "",
		target = this == player ? computer : player, board = target.ship.direction, squad,
		win = this == player ? "Вы выиграли раунд!" : "Компьютер выиграл раунд...",
		targetSide = function() {
			squad = 0;
			if (!sumArray(target.ship.guns[board])) target.ship.guns[board] = []; //посмотреть, как можно улучшить, чтоб не делать двойную проверку
			for (let side in target.ship.guns) squad += target.ship.guns[side].length;
			if (!squad) {
				game.roundEnd = true;
				msg = "<br>Оставшийся экипаж больше не может оказывать сопротивление и сдаётся!";
				return 0;
			}
			while ( !sumArray(target.ship.guns[board]) ) {
				switch(board) {
					case "top":
						board = "right";
						break;
					case "right":
						board = "bottom";
						break;
					case "bottom":
						board = "left";
						break;
					case "left":
						board = "top";
						break;
				}
				index = 0;
			}
			return target.ship.guns[board][index];
		};
		salvo.sort(sortArray);
		if (salvo[2] == 6 || (salvo[1] == 6 && game.distance == 0)) {
			if (target.ship.evasion == 0) {
				this.victPts++;
				game.roundEnd = true;
			}
			msg = (target.ship.evasion > 0) ? "Защищающаяся сторона использует уклонение<br>Уклонений осталось: " + --target.ship.evasion : win;
			result.innerHTML = "Удачное попадание вызвало детонацию порохового склада!<br>" + msg;
			game.setArms.call(target);
			return result;
		}
		for (let i = 0; i < salvo.length; i++) {
			let trgt = targetSide();
			if (!trgt) break;
			if (salvo[i] > trgt) {
				kills++;
				wounds += target.ship.guns[board][index];
				target.ship.guns[board][index] = 0;
				index++;
			} else if (salvo[i] == trgt) {
				if (trgt != 1) {
					wounds++;
					target.ship.guns[board][index]--;
				} else {
					kills++;
					target.ship.guns[board][index] = 0;
					index++;
				}
			}
		}
		target.ship.guns[board] = target.ship.guns[board].filter(function(crew) {
			return crew > 0;
		});
		target.ship.guns[board].sort(sortArray);
		game.setArms.call(target);
		result.innerHTML = "Пушек уничтожено: " + kills + "<br>Членов экипажа ранено: " + wounds + msg;
		return result;
	},
	getTotalCrew: function() {
		let c = 0;
		for (let board in this) {
			for (let i = 0; i < this[board].length; i++) {
				c += this[board][i];
			}
		}
		return c;
	},
	move: function() {
		this.distance = this.distance ? false : true;
		// @todo проверить, можно ли рендерить движение кораблей в рендерконтрол
		player.ship.object.style.top = this.distance ? "300px" : "250px";
		computer.ship.object.style.top = this.distance ? "0px" : "50px";
		grapple.disabled = this.distance ? "disabled" : "";
	},
	changeMove: function() {
		player.move = player.move ? false : true;
		computer.move = computer.move ? false : true;
	},
	changeCourse: function(side) {
		// true при повороте налево
		let deg = 0;
		switch(this.ship.direction) {
			case "right":
				deg = 90;
				this.ship.direction = side ? "top" : "bottom";
				break;
			case "bottom":
				deg = 180;
				this.ship.direction = side ? "right" : "left";
				break;
			case "left":
				deg = -90;
				this.ship.direction = side ? "bottom" : "top";
				break;
			case "top":
				this.ship.direction = side ? "left" : "right";
				break;
		}
		deg += side ? -90 : 90;
		this.ship.object.style.transform = 'rotate(' + deg + 'deg)';
		game.setArms.call(this);
	},
	changeWind: function() {
		let wind, dice = document.getElementById("windDice");
		if (dice == null) {
			dice = document.createElement("img")
			dice.className = "dices";
			dice.id = "windDice";
			compas.appendChild(dice);
		}
		if (compas.style.display != "block") compas.style.display = "block";
		switch(this.rollDice([dice])[0]) {
			case 1:
			case 2:
				wind = "north";
				break;
			case 3:
			case 4:
				wind = "south";
				break;
			case 5:
				wind = "west";
				break;
			case 6:
				wind = "east";
		}
		return wind;
	},
	loadArms: function() {
		for (let side in this.ship.guns) {
			let notBoard = (side != "top" && side != "bottom") ? false : true;
			for (let i = 0; i < 5; i++) { // максимум 5 орудий по борту
				let crew = notBoard ? 4 : 3;
				switch(this.ship.name) {
					case "Бригантина": crew++;
					case "Фрегат": crew++;
					case "Галеон": this.ship.guns[side].push(crew);
				}
				game.createDiv.call(this.ship.object, side);
				if (this.ship.name == "Бригантина" && notBoard) break;
				else if (i == 1 && this.ship.name == "Фрегат" && notBoard) break;
				else if ( i == 2 && ( this.ship.name == "Бригантина" || (this.ship.name == "Галеон" && notBoard) ) ) break;
				else if (i == 3 && this.ship.name == "Фрегат") break;
			}
		}
		switch(this.ship.name) {
			case "Бригантина": ++this.ship.evasion;
			case "Фрегат": ++this.ship.evasion;
			case "Галеон":
				++this.ship.evasion;
				game.createDiv.call(this.ship.object, "eva");
		}
	},
	createDiv: function(name) {
		let div = document.createElement("div");
		div.className = name;
		this.appendChild(div);
	},
	setArms: function() {
		let self = game, eva = this.ship.object.getElementsByClassName("eva")[0];
		for (let side in this.ship.guns) {
			let guns = this.ship.object.getElementsByClassName(side);
			for (let i = 0; i < guns.length; i++) {
				guns[i].innerHTML = this.ship.guns[side][i] === undefined ? "X" : this.ship.guns[side][i];
				self.renderArmament.call( this, guns[i], self.getArmCoordinates.call(this, side, i) );
			}
		}
		eva.innerHTML = this.ship.evasion;
		self.renderArmament.call( this, eva, self.getArmCoordinates.call(this, "evasion") );
	},
	getArmCoordinates: function(side, id) {
		let x = 0, y = 0, arr = [];
		if (side == "evasion") {
			if (this.ship.name == "Галеон") return [68, 94];
			else return [23, 41];
		} else switch(this.ship.name) {
			case "Бригантина":
				switch(side) {
					case "top":
						x = 80;
						y = 25;
						break;
					case "right":
						x = 123;
						y = 82 + id * 25;
						break;
					case "bottom":
						x = 48;
						y = 175;
						break;
					case "left":
						x = 12;
						y = 84 + id * 25;
						break;
				}
				break;
			case "Фрегат":
				switch(side) {
					case "top":
						x = 80 + id * 25;
						y = 15;
						break;
					case "right":
						x = 123;
						y = 69 + id * 25;
						break;
					case "bottom":
						x = 35 + id * 63;
						y = 177;
						break;
					case "left":
						x = 12;
						y = 70 + id * 25;
						break;
				}
				break;
			case "Галеон":
				switch(side) {
					case "top":
						if (id != 2) {
							x = 92 + id * 22;
							y = 7;
						} else {
							x = 103;
							y = 30;
						}
						break;
					case "right":
						x = 124;
						y = 55 + id * 25;
						break;
					case "bottom":
						x = 46 + id * 23;
						y = 176;
						break;
					case "left":
						x = 13;
						y = 56 + id * 25;
						break;
				}
				break;
		}
		arr.push(x);
		arr.push(y);
		return arr;
	},
	renderArmament: function(obj, arr) {
		if (this == player) {
			obj.style.left = arr[0] + "px";
			obj.style.top = arr[1] + "px";
		} else {
			obj.style.right = arr[0] + "px";
			obj.style.bottom = arr[1] + "px";
		}
		switch(this.ship.direction) {
			case "top":
				obj.style.transform = "rotate(0deg)";
				break;
			case "right":
				obj.style.transform = "rotate(-90deg)";
				break;
			case "bottom":
				obj.style.transform = "rotate(180deg)";
				break;
			case "left":
				obj.style.transform = "rotate(90deg)";
		}
	},
	renderGrapple: function() {
		dialog.innerHTML = computer.move ? "Компьютер объявляет абордаж.<br>" : "";
		dialog.innerHTML += "Бросим кости на абордаж!";
		for (let i = 0; i < 2; i++) {
			let div = document.createElement("div");
			div.innerHTML = "Боеспособный экипаж корабля: ";
			div.innerHTML += !i ? this.getTotalCrew.call(computer.ship.guns) : this.getTotalCrew.call(player.ship.guns);
			dialog.appendChild(div);
			for (let j = 0; j < 2; j++) {
				let dice = document.createElement("img");
				dice.className = "dices grappleDices";
				dice.src = "images/dice.gif";
				div.appendChild(dice);
			}
		}
		dialog.style.display = "block";
		return new Promise(function(resolve) {
			let btn = document.createElement("button");
			btn.innerHTML = "Бросить!";
			dialog.appendChild(btn);
			btn.onclick = function() {
				btn.innerHTML = "далее";
				return resolve(btn);
			};
		});
	},
	renderFire: function() {
		let btn = document.createElement("button"), msg = document.createElement("p"),
		that = this, shooting = function() {
			let dices = document.getElementsByClassName("fireDices"), result = game.rollDice(dices);
			msg.innerHTML = "Результаты залпа:";
			dialog.appendChild(game.fireResult.call(that, result));
			btn.innerHTML = player.move ? "далее" : "принять";
			dialog.appendChild(btn);
		};
		dialog.innerHTML = "";
		dialog.style.display = "block";
		dialog.appendChild(msg);
		for (let i = 0; i < this.ship.guns[this.ship.direction].length; i++) {
			let dice = document.createElement("img");
			dice.className = "dices fireDices";
			dice.src = "images/dice.gif";
			dialog.appendChild(dice);
		}
		if (player.move) {
			msg.innerHTML = "Товсь!";
			btn.innerHTML = "Пли!";
			btn.style.display = "block";
			return new Promise(function(resolve) {
				dialog.appendChild(btn);
				btn.onclick = function() {
					shooting();
					return resolve(btn);
				};
			});
		} else {
			return new Promise(function(resolve) {
				shooting();
				return resolve(btn);
			});
		}
	},
	renderControl: function(MP) { // @todo расчет стоимости движения вынести в отдельную функцию
		let moveCostF = 1, moveCostL = 1, moveCostR = 1, moveCostB = 2,
			that = player.move ? player.ship : computer.ship;
		//влияние ветра на стоимость движения
		switch(that.direction) {
			case "top":
				switch(this.wind) {
					case "north":
						moveCostF = 0;
						break;
					case "east":
						moveCostR = 0;
						break;
					case "south":
						moveCostF = 2;
						moveCostB = 1;
						break;
					case "west":
						moveCostL = 0;
				}
				if (this.distance && MP >= moveCostF) move.disabled = "";
				break;
			case "bottom":
				switch(this.wind) {
					case "north":
						moveCostF = 2;
						moveCostB = 1;
						break;
					case "east":
						moveCostL = 0;
						break;
					case "south":
						moveCostF = 0;
						break;
					case "west":
						moveCostR = 0;
				}
				if (!this.distance && MP >= moveCostF) move.disabled = "";
				break;
		}
		if (MP >= moveCostL) turnLeft.disabled = "";
		if (MP >= moveCostR) turnRight.disabled = "";
		if (MP >= moveCostB) turnAround.disabled = "";
		if (MP) fire.disabled = that.reloading.indexOf(that.direction) == -1 ? "" : "disabled";
		move.innerHTML = "Полный вперёд! (" + moveCostF + " од)";
		turnLeft.innerHTML = "Лево руля! (" + moveCostL + " од)";
		turnRight.innerHTML = "Право руля! (" + moveCostR + " од)";
		turnAround.innerHTML = "Разворот! (" + moveCostB + " од)";
		controlPanel.style.display = "grid";
		infoPanel.innerHTML = "ОД: " + MP;
		return [moveCostF, moveCostR, moveCostB, moveCostL];
	},
	deactivation: function() {
		// @todo: перенести все стили в CSS и манипулировать классами, а не стилями
		controlPanel.style.display = "none";
		move.disabled = "disabled";
		turnLeft.disabled = "disabled";
		turnRight.disabled = "disabled";
		turnAround.disabled = "disabled";
		fire.disabled = "disabled";
	}
};

window.addEventListener('load', game.PlayTheGame());