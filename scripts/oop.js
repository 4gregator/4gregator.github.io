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
		guns: {
			left: [],
			right: [],
			top: [],
			bottom: []
		}
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
		this.ship.object.getElementsByClassName("ship")[0].style.display = "block";
	},
	renderStrata: function() {
		let strata = document.getElementsByClassName("strata");
		for (let i = 0; i < strata.length; i++) {
			strata[i].src = "images/" + this.hand[i].id + ".jpg";
			strata[i].style.display = "block";
		}
	},
	shipChoice: function() {
		let text = (this.fleet.length != 1) ? "<p>Выберите корабль:<p>": "<p>У вас остался последний корабль:<p>";
		dialog.innerHTML = text;
		return new Promise(function(resolve) {
			for (let i = 0; i < player.fleet.length; i++) {
				let shipAvlbl = document.createElement("button");
				shipAvlbl.innerHTML = player.fleet[i];
				shipAvlbl.addEventListener('click', function() {
					dialog.style.display = "none";
					player.ship.name = (player.fleet.length != 1) ? player.fleet.splice(i, 1)[0] : player.fleet[i];
					player.renderShip();
					game.loadGuns.call(player, plrShip);
					computer.init();
					return resolve();
				});
				dialog.appendChild(shipAvlbl);
			}
		});
	}
},
computer = {
	gender: false,
	move: false,
	victPts: 0,
	fleet: ["Бригантина", "Фрегат", "Галеон"],
	ship: {
		name: false,
		direction: "top",
		movePts: 0,
		guns: {
			left: [],
			right: [],
			top: [],
			bottom: []
		}
	},
	hand: [],
	init: function() {
		if (!this.gender) this.gender = random(0, 1) ? "male" : "female";
		this.ship.name = this.fleet.splice(random(0, this.fleet.length - 1))[0];
		this.render();
	},
	render: function() {
		portretOpp.src = "images/" + this.gender + ".jpg";
		portretOpp.style.display = "block";
		oppShip.getElementsByClassName("ship")[0].src = "images/" + this.ship.name + "2.jpg";
		oppShip.getElementsByClassName("ship")[0].style.display = "block";
	}
},
game = {
	round: 0,
	roundEnd: true,
	PlayTheGame: function() {
		if (player.victPts == 2 || computer.victPts == 2) return 0;
		this.round++;
		if (this.round == 1) this.init().then(game.roundStart.bind(game));
		//
		/*let roundOver = new Promise(function(resolve) {
			let endRound = document.createElement("button");
			endRound.innerHTML = "Завершить раунд";
			endRound.onclick = function() {
				popup.style.display = "none";
				return resolve();
			}
			roundStart();
			shipChoice().then(function() {
				chooseDirection().then(function() {
					loadGuns(enemyShip);
					roundPlay(endRound);
				});
			});
		});
		roundOver.then(function() {
			clearField();
			PlayTheGame();
		});*/
	},
	init: function() {
		let gender = new Promise(function(resolve) {
			play.addEventListener('click', function() {
				player.init( document.getElementsByClassName("gender") ).then(function() {return resolve();});
			});
		});
		return new Promise(function(resolve) {
			gender.then(function() {
				game.firstMove().then(function() {return resolve();});
			});
		});
	},
	firstMove: function() {
		dialog.innerHTML = "<p>Бросим кости и узнаем, кто ходит первый!<p>";
		for (let i = 0; i < 2; i++) {
			let dice = document.createElement("img");
			dice.className = "dices";
			dice.src = "images/dice.gif";
			dice.width = 44;
			dice.height = 44;
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
		this.roundEnd = false;
		this.takeStrata();
		this.renderStrata();
		player.shipChoice().then(function() {
			game.setGuns.call(player);
		});
	},
	takeStrata: function() {
		let deck = [],
			playerTurn = player.move ? true : false;
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
	loadGuns: function(elem) {
		for (let side in this.ship.guns) {
			let notBoard = (side != "top" && side != "bottom") ? false : true;
			for (let i = 0; i < 5; i++) { // максимум 5 орудий по борту
				let crew = notBoard ? 4 : 3;
				switch(this.ship.name) {
					case "Бригантина": crew++;
					case "Фрегат": crew++;
					case "Галеон": this.ship.guns[side].push(crew);
				}
				game.createGun.call(elem, side);
				if (this.ship.name == "Бригантина" && notBoard) break;
				else if (i == 1 && this.ship.name == "Фрегат" && notBoard) break;
				else if ( i == 2 && ( this.ship.name == "Бригантина" || (this.ship.name == "Галеон" && notBoard) ) ) break;
				else if (i == 3 && this.ship.name == "Фрегат") break;
			}
		}
		console.log(this.ship);
	},
	createGun: function(name) {
		let div = document.createElement("div");
		div.className = name;
		div.style.position = "absolute";
		this.appendChild(div);
	},
	setGuns: function() {
		for (let side in this.ship.guns) {
			let guns = this.ship.object.getElementsByClassName(side);
			//
			[].forEach.call( this, game.renderGun.bind( this, guns[i], game.getGunCoordinates.bind(this, side, i) ) );
			//
			for (let i = 0; i < guns.length; i++) {
				console.log(this.ship.guns.side);
				guns[i].innerHTML = side[i];
				game.renderGun.call( this, guns[i], game.getGunCoordinates.call(this, side, i) );
			}
		}
	},
	renderGun: function(obj, arr) {
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
				break;
		}
	},
	getGunCoordinates: function(side, id) {
		let x = 0, y = 0, arr = [];
		switch(this.ship.name) {
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
						y = 13;
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
	}
};

window.addEventListener('load', function() {
	game.PlayTheGame();
});

function random(min, max){
	return Math.floor(Math.random() * (max + 1 - min) + min);
};
function compareRandom(a, b) {
	return Math.random() - 0.5;
};

var stratagems = [{
	id: 1,
},
{
	id: 2,
},
{
	id: 3,
},
{
	id: 4,
},
{
	id: 5,
},
{
	id: 6,
},
{
	id: 7,
},
{
	id: 8,
},
{
	id: 9,
},
{
	id: 10,
},
{
	id: 11,
},
{
	id: 12,
},
{
	id: 13,
},
{
	id: 14,
},
{
	id: 15,
},
{
	id: 16,
},
{
	id: 17,
},
{
	id: 18,
},
{
	id: 19,
},
{
	id: 20,
},
{
	id: 21,
},
{
	id: 22,
},
{
	id: 23,
},
{
	id: 24,
},
{
	id: 25,
},
{
	id: 26,
},
{
	id: 27,
},
{
	id: 28,
},
{
	id: 29,
},
{
	id: 30,
}];