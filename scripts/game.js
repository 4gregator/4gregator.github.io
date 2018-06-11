var distance = 1;
var gender = 0;
var round = 1;
var wind;
var ship;
var shipDirection = "top";
var ships = ["Бригантина", "Фрегат", "Галеон"];
var leftGuns = [];
var rightGuns = [];
var topGuns = [];
var bottomGuns = [];
var totalGuns = [topGuns, rightGuns, bottomGuns, leftGuns];
var hand = [];
var deck = [];
var stratagems = [];
for (let i = 0; i < 30; i++) {
	stratagems.push(i + 1);
};
var popup = document.getElementById("dialog");
var yourShip = document.getElementById("shipPlayer");

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
				loadGuns();
				setGuns();
				wind();
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
function loadGuns() {
	var left = [];
	var right = [];
	var top = [];
	var bottom = [];
	var arsenal = [top, right, bottom, left];
	let brigantine = (ship == "Бригантина");
	let frigate = (ship == "Фрегат");
	for (let i = 0; i < 4; i++) {
		let notBoard;
		if (i % 2) {
			notBoard = 0
		} else notBoard = 1;
		for (let j = 0; j < 5; j++) {
			let name;
			switch(i) {
				case 0:
					name = "top";
					break;
				case 1:
					name = "right";
					break;
				case 2:
					name = "bottom";
					break;
				case 3:
					name = "left";
					break;
			}
			arsenal[i][j] = loadGun(name);
			if (brigantine) totalGuns[i][j] = notBoard ? 6 : 5;
			else if (frigate) totalGuns[i][j] = notBoard ? 5 : 4;
			else totalGuns[i][j] = notBoard ? 4 : 3;
			if (brigantine && notBoard) break;
			else if (j == 1 && frigate && notBoard) break;
			else if (j == 2 && (brigantine || (ship == "Галеон" && notBoard))) break;
			else if (j == 3 && frigate) break;
		}
	}
}
function loadGun(name) {
	let div = document.createElement("div");
	div.className = name;
	div.style.position = "absolute";
	yourShip.appendChild(div);
	return div;
}

// расставляем орудийные расчёты в зависимости от типа корабля и его направления
function setGuns() {
	let left = document.getElementsByClassName("left");
	let right = document.getElementsByClassName("right");
	let top = document.getElementsByClassName("top");
	let bottom = document.getElementsByClassName("bottom");
	let arsenal = [top, right, bottom, left];
	arsenal.forEach(function(side, i) {
		[].forEach.call(side, function(gun, j) {
			gun.innerHTML = totalGuns[i][j];
			placeGun(gun, getCoordinate(i, j));
		});
	});
}
function placeGun(obj, arr) {
	obj.style.left = arr[0] + "px";
	obj.style.top = arr[1] + "px";
	switch(shipDirection) {
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
function getCoordinate(i, j) {
	let x = 0;
	let y = 0;
	let arr = [];
	switch(ship) {
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
	compas.innerHTML = "<img src='images/wind.jpg' width='100' height='100'>";
	switch(rollDice()) {
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

function chooseDirection() {
	let Left = document.createElement("button");
	Left.innerHTML = "повернуть влево";
	Left.onclick = function() {
		changeCourse(1);
	}
	let Right = document.createElement("button");
	Right.innerHTML = "повернуть вправо";
	Right.onclick = function() {
		changeCourse(0);
	}
	popup.innerHTML = "Выберите начальное направление корабля";
	popup.appendChild(Left);
	popup.appendChild(Right);
	popup.style.display = "block";
}

//меняем курс корабля
function changeCourse(left) {
	let deg = 0;
	switch(shipDirection) {
		case "right":
			deg = 90;
			shipDirection = left ? "top" : "bottom";
			break;
		case "bottom":
			deg = 180;
			shipDirection = left ? "right" : "left";
			break;
		case "left":
			deg = -90;
			shipDirection = left ? "bottom" : "top";
			break;
		default:
			shipDirection = left ? "left" : "right";
	}
	deg = left ? -90 + deg : 90 + deg;
	yourShip.style.transform = "rotate(" + deg + "deg)";
	setGuns();
}

// проверка статуса игры и активных стратагем
function checkStatus() {}

function checkStrata(arr) {
	let a = arr.length;
	for (let i = 0; i < a; i++) {}
}

// запуск игры после проверки
function Continue() {}

function rollDice() {
	let rand = Math.random() * 6 + 1;
	rand = Math.floor(rand);
	return rand;
}