var distance = 1;
var gender = 0;
var round = 1;
var ship;
var shipDirection = "up";
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
		popup.innerHTML = "<p>Выберете корабль на <p>" + round + " раунд";
		for (let i = 0; i < a; i++) {
			let shipAvlbl = document.createElement("button");
			shipAvlbl.innerHTML = ships[i];
			shipAvlbl.onclick = function() {
				popup.style.display = "none";
				ship = ships.splice(i, 1)[0];
				yourShip.innerHTML = "<img src='images/" + ship + ".jpg' width='143' height='200'>";
				loadGuns();
				wind();
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
	let brigantine = 0;
	let frigate = 0;
	if (ship == "Бригантина") brigantine = 1;
	if (ship == "Фрегат") frigate = 1;
	for (let i = 0; i < 4; i++) {
		let notBoard;
		if (i % 2) {
			notBoard = 0
		} else notBoard = 1;
		for (let j = 0; j < 5; j++) {
			arsenal[i][j] = loadGun();
			if (brigantine) notBoard ? totalGuns[i][j] = 6 : totalGuns[i][j] = 5;
			else if (frigate) notBoard ? totalGuns[i][j] = 5 : totalGuns[i][j] = 4;
			else notBoard ? totalGuns[i][j] = 4 : totalGuns[i][j] = 3;
			arsenal[i][j].innerHTML = totalGuns[i][j];
			if (brigantine && notBoard) break;
			else if (j == 1 && frigate && notBoard) break;
			else if (j == 2 && (brigantine || (ship == "Галеон" && notBoard))) break;
			else if (j == 3 && frigate) break;
		}
	}
	setGuns();
}
function loadGun() {
	let div = document.createElement("div");
	/*div.className = name;*/
	div.style.position = "absolute";
	yourShip.appendChild(div);
	return div;
}

function setGuns() {
	let board = document.getElementsByClassName(position);
	if (ship == "Бригантина") {
		if (shipDirection == "up") {
			if (position == "left") {
				for (let i = 0, p = 84; i < 3; i++, p += 25) {
					board[i].style.top = p + "px";
					board[i].style.left = "12px";
				}
			}
		}
	}
}

function wind() {}

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