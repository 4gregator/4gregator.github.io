var distance = 1;
var gender = 0;
var round = 1;
var turn = 0;
var movePts = 0;
var wind;
var ship;
var shipOpp = "Галеон";
var shipDirection = "top";
var shipOppDirection = "top";
var ships = ["Бригантина", "Фрегат", "Галеон"];
var leftGuns = [];
var rightGuns = [];
var topGuns = [];
var bottomGuns = [];
var totalGuns = [topGuns, rightGuns, bottomGuns, leftGuns];
var leftGunsOpp = [];
var rightGunsOpp = [];
var topGunsOpp = [];
var bottomGunsOpp = [];
var totalGunsOpp = [topGunsOpp, rightGunsOpp, bottomGunsOpp, leftGunsOpp];
var hand = [];
var deck = [];
var stratagems = [];
for (let i = 0; i < 30; i++) {
	stratagems.push(i + 1);
};
var popup = document.getElementById("dialog");
var yourShip = document.getElementById("shipPlayer");
var enemyShip = document.getElementById("shipOpponent");
var fire = document.getElementById("fire");

function male() {
	gender = 1;
	popup.style.display = "none";
	start();
}
function female() {
	gender = 2;
	popup.style.display = "none";
	start();
}

function start() {
	shuffleDeck(stratagems);
	deck = stratagems;
	while (hand.length < 6) {
		takeStrata(deck);
	}
}

function shuffleDeck(arr) {
	arr.sort(compareRandom);
}
function compareRandom(a, b) {
	return Math.random() - 0.5;
}

function takeStrata(arr) {
	let a = hand.length;
	if (a < 5) {
		hand.push(arr.shift());
		document.getElementsByClassName("strata")[a].innerHTML = "<img src='images/" + hand[a] + ".jpg' width='89' height='124'>";
	} else {
		hand.push(arr.shift());
		document.getElementsByClassName("strata")[a].innerHTML = "<img src='images/" + hand[a] + ".jpg' width='89' height='124'>";
		shipChoice();
	}
}

function shipChoice() {
	let a = ships.length;
	if (a != 1) {
		popup.innerHTML = "<p>Выберите корабль на <p>" + round + " раунд";
		for (let i = 0; i < a; i++) {
			let shipAvlbl = document.createElement("button");
			shipAvlbl.innerHTML = ships[i];
			shipAvlbl.onclick = function() {
				popup.style.display = "none";
				ship = ships.splice(i, 1)[0];
				yourShip.innerHTML = "<img src='images/" + ship + ".jpg' width='143' height='200'>";
				loadGuns(yourShip);
				setGuns(yourShip);
				wind();
				loadGuns(enemyShip);
				setGuns(enemyShip);
				chooseDirection();
			}
			popup.appendChild(shipAvlbl);
		}
	} else {
		popup.innerHTML = "<p>У вас остался последний корабль:<p>";
		let shipAvlbl = document.createElement("button");
		shipAvlbl.innerHTML = ships[0];
		shipAvlbl.onclick = function() {
				popup.style.display = "none";
				ship = ships[0];
				yourShip.innerHTML = "<img src='images/" + ship + ".jpg' width='143' height='200'>";
				wind();
			}
		popup.appendChild(shipAvlbl);
	}
	popup.style.display = "block";
}

// подгружаем пушки в зависимости от типа корабля
function loadGuns(elem) {
	let player = (elem == yourShip) ? 1 : 0;
	let arsenal = [	[],	[],	[],	[] ];
	let brigantine = player ? (ship == "Бригантина") : (shipOpp == "Бригантина");
	let frigate = player ? (ship == "Фрегат") : (shipOpp == "Фрегат");
	let galleon = player ? (ship == "Галеон") : (shipOpp == "Галеон");
	for (let i = 0; i < 4; i++) {
		let notBoard;
		if (i % 2) {
			notBoard = 0
		} else notBoard = 1;
		for (let j = 0; j < 5; j++) {
			let name;
			let crew = 0;
			switch(i) {
				case 0:
					name = player ? "top" : "topOpp";
					break;
				case 1:
					name = player ? "right" : "rightOpp";
					break;
				case 2:
					name = player ? "bottom" : "bottomOpp";
					break;
				case 3:
					name = player ? "left" : "leftOpp";
			}
			arsenal[i][j] = loadGun(name, elem);
			if (brigantine) crew = notBoard ? 6 : 5;
			else if (frigate) crew = notBoard ? 5 : 4;
			else crew = notBoard ? 4 : 3;
			player ? totalGuns[i][j] = crew : totalGunsOpp[i][j] = crew;
			if (brigantine && notBoard) break;
			else if (j == 1 && frigate && notBoard) break;
			else if (j == 2 && (brigantine || (galleon && notBoard))) break;
			else if (j == 3 && frigate) break;
		}
	}
}
function loadGun(name, elem) {
	let div = document.createElement("div");
	div.className = name;
	div.style.position = "absolute";
	elem.appendChild(div);
	return div;
}

// расставляем орудийные расчёты в зависимости от типа корабля и его направления
function setGuns(elem) {
	let player = (elem == yourShip) ? 1 : 0;
	let left = player ? document.getElementsByClassName("left") : document.getElementsByClassName("leftOpp");
	let right = player ? document.getElementsByClassName("right") : document.getElementsByClassName("rightOpp");
	let top = player ? document.getElementsByClassName("top") : document.getElementsByClassName("topOpp");
	let bottom = player ? document.getElementsByClassName("bottom") : document.getElementsByClassName("bottomOpp");
	let arsenal = [top, right, bottom, left];
	arsenal.forEach(function(side, i) {
		[].forEach.call(side, function(gun, j) {
			gun.innerHTML = player ? totalGuns[i][j] : totalGunsOpp[i][j];
			placeGun(player, gun, getCoordinate(player, i, j));
		});
	});
}
function placeGun(player, obj, arr) {
	let direction = player ? shipDirection : shipOppDirection;
	if (player) {
		obj.style.left = arr[0] + "px";
		obj.style.top = arr[1] + "px";
	} else {
		obj.style.right = arr[0] + "px";
		obj.style.bottom = arr[1] + "px";
	}
	switch(direction) {
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
}
function getCoordinate(player, i, j) {
	let boat = player ? ship : shipOpp;
	let x = 0;
	let y = 0;
	let arr = [];
	switch(boat) {
		case "Бригантина":
			switch(i) {
				case 0:
					x = 80;
					y = 25;
					break;
				case 1:
					x = 123;
					y = 82 + j * 25;
					break;
				case 2:
					x = 48;
					y = 175;
					break;
				case 3:
					x = 12;
					y = 84 + j * 25;
					break;
			}
			break;
		case "Фрегат":
			switch(i) {
				case 0:
					x = 80 + j * 25;
					y = 13;
					break;
				case 1:
					x = 123;
					y = 69 + j * 25;
					break;
				case 2:
					x = 35 + j * 63;
					y = 177;
					break;
				case 3:
					x = 12;
					y = 70 + j * 25;
					break;
			}
			break;
		case "Галеон":
			switch(i) {
				case 0:
					if (j != 2) {
						x = 92 + j * 22;
						y = 7;
					} else {
						x = 103;
						y = 30;
					}
					break;
				case 1:
					x = 124;
					y = 55 + j * 25;
					break;
				case 2:
					x = 46 + j * 23;
					y = 176;
					break;
				case 3:
					x = 13;
					y = 56 + j * 25;
					break;
			}
			break;
	}
	arr.push(x);
	arr.push(y);
	return arr;
}

function wind() {
	let compas = document.getElementById("wind");
	let dice = document.createElement("img");
	dice.width = 40;
	dice.height = 40;
	dice.style.position = "absolute";
	dice.style.top = "30px";
	dice.style.left = "30px";
	compas.innerHTML = "<img src='images/wind.jpg' width='100' height='100'>";
	compas.appendChild(dice);
	switch(rollDice(dice)) {
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
}

//первоначальное положение корабля
function chooseDirection() {
	let Left = document.createElement("button");
	Left.innerHTML = "повернуть влево";
	Left.onclick = function() {
		changeCourse(1, yourShip);
	}
	let Right = document.createElement("button");
	Right.innerHTML = "повернуть вправо";
	Right.onclick = function() {
		changeCourse(0, yourShip);
	}
	popup.innerHTML = "<p>Выберите начальное направление корабля<p>";
	popup.appendChild(Left);
	popup.appendChild(Right);

	//test
	let test = document.createElement("button");
	test.innerHTML = "test";
	test.onclick = function() {
		move();
	}
	popup.appendChild(test);
	fire.disabled = "";

	popup.style.display = "block";
}

//меняем курс корабля
function changeCourse(left, elem) {
	let player = (elem == yourShip) ? 1 : 0;
	let direction = player ? shipDirection : shipOppDirection;
	let deg = 0;
	switch(direction) {
		case "right":
			deg = 90;
			direction = left ? "top" : "bottom";
			break;
		case "bottom":
			deg = 180;
			direction = left ? "right" : "left";
			break;
		case "left":
			deg = -90;
			direction = left ? "bottom" : "top";
			break;
		default:
			direction = left ? "left" : "right";
	}
	player ? shipDirection = direction : shipOppDirection = direction;
	deg = left ? -90 + deg : 90 + deg;
	elem.style.transform = "rotate(" + deg + "deg)";
	setGuns(elem);
}

function move() {
	let btn = document.getElementById("grapple");
	distance = distance ? 0 : 1;
	yourShip.style.top = distance ? "300px" : "250px";
	enemyShip.style.top = distance ? "0px" : "50px";
	btn.disabled = distance ? "disabled" : "";
}

function salvo() {
	let guns = 0;
	let squadron = [];
	let shoots = [];
	let fire = document.createElement("button");
	fire.innerHTML = "пли!";
	fire.onclick = function() {
		squadron.forEach(function(el, i) {
			let dices = document.getElementsByClassName("dices");
			shoots[i] = rollDice(dices[i]);
		});
		fire.style.display = "none";
		shoots.sort(function(a, b) {
			return b - a;
		});
		getResult(shoots);
	}
	popup.innerHTML = "";
	popup.appendChild(fire);
	switch(shipDirection) {
		case "right":
			squadron = leftGuns;
			break;
		case "bottom":
			squadron = bottomGuns;
			break;
		case "left":
			squadron = rightGuns;
			break;
		default:
			squadron = topGuns;
	}
	guns = squadron.length;
	for (let i = 0; i < guns; i++) {
		let dice = document.createElement("img");
		dice.className = "dices";
		dice.src = "images/dice.gif";
		dice.width = 44;
		dice.height = 44;
		popup.appendChild(dice);
	}
}
function getResult(arr) {
	let kills = 0;
	let wounds = 0;
	let i = 0;
	let index = 0;
	switch(shipOppDirection) {
		case "right":
			index = 1;
			break;
		case "bottom":
			index = 2;
			break;
		case "left":
			index = 3;
			break;
		default: break;
	}
	let target = getTarget(index);
	arr.forEach(function(dice) {
		/*if (dice < target[i]) brake;*/
		if (dice > target[i]) {
			kills++;
			i++;
		} else if (dice == target[i]) {
			wounds++;
			i++;
		}
	});
	let result = document.createElement("p");
	result.innerHTML = "Пушек уничтожено: " + kills + "<br>Членов экипажа ранено: " + wounds;
	popup.appendChild(result);
}
function getTarget(index) {
	if (totalGunsOpp[index].valueOf() == 0) {
		index == 3 ? index = 0 : index++;
		getTarget();
	} else return totalGunsOpp[index];
}

// проверка статуса игры и активных стратагем
function checkStatus() {}

function checkStrata(arr) {
	let a = arr.length;
	for (let i = 0; i < a; i++) {}
}

// запуск игры после проверки
function Continue() {}

function closeCombat() {alert("yo");}

function rollDice(dice) {
	let rand = Math.random() * 6 + 1;
	rand = Math.floor(rand);
	dice.src = "images/" + rand + ".png";
	return rand;
}