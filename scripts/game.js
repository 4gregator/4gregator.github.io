var gender = 0;
var round = 1;
var hand = [];
var ships = ["Бригантина", "Фрегат", "Галеон"];
var ship;
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
	deckShuffle(stratagems);
	deck = stratagems;
	while (hand.length < 6) {
		takeStrata(deck);
	}
}
function compareRandom(a, b) {
	return Math.random() - 0.5;
}
function deckShuffle(arr) {
	arr.sort(compareRandom);
}
function takeStrata(arr) {
	let a = hand.length;
	if (a < 6) {
		hand.push(arr.shift());
		document.getElementsByClassName("strata")[a].innerHTML = "<img src='images/" + hand[a] + ".jpg' width='89' height='124'>";
	}
	a = hand.length;
	if (a == 6) {
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
			/*shipAvlbl.onclick function() {
				ship = 
			}*/
			popup.appendChild(shipAvlbl);
		}
	}
	popup.style.display = "block";
}