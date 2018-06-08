var distance = 1;
var gender = 0;
var round = 1;
var ship;
var ships = ["Бригантина", "Фрегат", "Галеон"];
var hand = [];
var deck = [];
var stratagems = [];
for (let i = 0; i < 30; i++) {
	stratagems.push(i + 1);
};
var popup = document.getElementById("dialog");

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
				document.getElementById("shipPlayer").innerHTML = "<img src='images/" + ship + ".jpg' width='143' height='200'>";
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
				document.getElementById("shipPlayer").innerHTML = "<img src='images/" + ship + ".jpg' width='143' height='200'>";
				wind();
			}
		popup.appendChild(shipAvlbl);
	}
	popup.style.display = "block";
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