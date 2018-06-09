var distance = 1;
var gender = 0;
var round = 1;
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
		popup.innerHTML = "<p>Выберете корабль на <p>" + round + " раунд";
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
			if (brigantine) notBoard ? totalGuns[i][j] = 6 : totalGuns[i][j] = 5;
			else if (frigate) notBoard ? totalGuns[i][j] = 5 : totalGuns[i][j] = 4;
			else notBoard ? totalGuns[i][j] = 4 : totalGuns[i][j] = 3;
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
			getCoordinate(gun, i, j);
		});
	});
}
function getCoordinate(obj, i, j) {
	let x = 0;
	let y = 0;
	switch(ship) {
		case "Бригантина":
			switch(shipDirection) {
				case "top":
					switch(i) {
						case 0:
							x = 80;
							y = 25;
							placeGun(obj, x, y);
							break;
						case 1:
							x = 123;
							y = 82 + j * 25;
							placeGun(obj, x, y);
							break;
						case 2:
							x = 48;
							y = 175;
							placeGun(obj, x, y);
							break;
						case 3:
							x = 12;
							y = 84 + j * 25;
							placeGun(obj, x, y);
							break;
					}
					break;
			}
			break;
		case "Фрегат":
			switch(shipDirection) {
				case "top":
					switch(i) {
						case 0:
							x = 80 + j * 25;
							y = 13;
							placeGun(obj, x, y);
							break;
						case 1:
							x = 123;
							y = 69 + j * 25;
							placeGun(obj, x, y);
							break;
						case 2:
							x = 35 + j * 63;
							y = 177;
							placeGun(obj, x, y);
							break;
						case 3:
							x = 12;
							y = 70 + j * 25;
							placeGun(obj, x, y);
							break;
					}
					break;
			}
			break;
		case "Галеон":
			switch(shipDirection) {
				case "top":
					switch(i) {
						case 0:
							if (j != 2) {
								x = 92 + j * 22;
								y = 7;
							} else {
								x = 103;
								y = 30;
							}
							placeGun(obj, x, y);
							break;
						case 1:
							x = 123;
							y = 55 + j * 25;
							placeGun(obj, x, y);
							break;
						case 2:
							x = 46 + j * 23;
							y = 176;
							placeGun(obj, x, y);
							break;
						case 3:
							x = 13;
							y = 56 + j * 25;
							placeGun(obj, x, y);
							break;
					}
					break;
			}
			break;
	}
}
function placeGun(obj, x, y) {
	obj.style.left = x + "px";
	obj.style.top = y + "px";
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