"use strict";

var player = {
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
	hand: {},
	init: function(collection) {
		for (let i = 0; i < collection.length; i++) {
			let id = collection[i].id;
			document.getElementById(id).addEventListener('click', function() {
				player.gender = id;
				popup.style.display = "none";
			});
		}
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
	hand: {},
	init: function() {
		if (!this.gender) this.gender = random(0, 1) ? "male" : "female";
		this.ship.name = this.fleet.splice(random(0, this.fleet.length - 1))[0];
		this.render();
	},
	render: function() {
		let img = document.getElementById("portret"),
			cmpShip = document.getElementById("shipOpponent");

		img.src = "images/" + computer.gender + ".jpg";
		img.style.display = "block";
		cmpShip.src = "images/" + computer.ship.name + "2.jpg";
		cmpShip.style.display = "block";
	}
},
game = {
	init: function() {
		let gender = new Promise(function(resolve) {
			document.getElementById("play").addEventListener('click', function() {
				document.getElementById("start").style.display = "none";
				popup.style.display = "block";
				player.init(document.getElementsByClassName("gender"));
				return resolve();
			});
		});
		gender.then(function() {
			popup.innerHTML = "<p>Бросим кости и узнаем, кто ходит первый!<p>";
			for (let i = 0; i < 2; i++) {
				let dice = document.createElement("img");
				dice.className = "dices";
				dice.src = "images/dice.gif";
				dice.width = 44;
				dice.height = 44;
				dice.style.display = "block";
				popup.appendChild(dice);
			}

			let roll = document.createElement('button');
			roll.innerHTML = "Бросить!";
			roll.addEventListener('click', function() {
				let numbers = game.rollDice( document.getElementsByClassName("dices") );
				if (numbers[0] != numbers[1]) {
					if (numbers[0] > numbers[1]) {
						popup.firstChild.innerHTML = "Гром и молния! Мой ход!";
						computer.move = true;
					}
					else {
						popup.firstChild.innerHTML = "Тысяча тухлых моллюсков!!! Твой ход!";
						player.move = true;
					}
					this.style.display = "none";
				}
			});
			popup.appendChild(roll);
		});
	},
	rollDice: function(dices) {
		let value = [];
		for (let i = 0; i < dices.length; i++) {
			let rand = random(1, 6);
			value.push(rand);
			dices[i].src = "images/" + rand + ".png";
		}
		return value;
	}
},
popup = document.getElementById("dialog");

window.addEventListener('load', function() {
	game.init();
});

function random(min, max){
	return Math.floor(Math.random() * (max + 1 - min) + min);
};