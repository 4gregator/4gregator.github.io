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
		portretOpp.src = "images/" + computer.gender + ".jpg";
		portretOpp.style.display = "block";
		shipOpponent.src = "images/" + computer.ship.name + "2.jpg";
		shipOpponent.style.display = "block";
	}
},
game = {
	roundEnd: true,
	init: function() {
		let gender = new Promise(function(resolve) {
			play.addEventListener('click', function() {
				player.init( document.getElementsByClassName("gender") ).then(function() {return resolve();});
			});
		});
		gender.then(function() {
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

			let roll = document.createElement('button');
			roll.innerHTML = "Бросить!";
			roll.addEventListener('click', game.checkFirstMove);
			dialog.appendChild(roll);
		});
	},
	checkFirstMove: function() {
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
			this.removeEventListener('click', game.checkFirstMove);
			this.innerHTML = "Далее";
			this.addEventListener('click', function() {
				game.takeStrata();
				console.log(player.hand);
				console.log(computer.hand);
			});
		}
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
	}
};

window.addEventListener('load', function() {
	game.init();
});

function random(min, max){
	return Math.floor(Math.random() * (max + 1 - min) + min);
};
function compareRandom(a, b) {
	return Math.random() - 0.5;
};

var stratagems = [{
	id: 1,
	src: "images/" + this.id + ".jpg",
},
{
	id: 2,
	src: "images/" + this.id + ".jpg",
},
{
	id: 3,
	src: "images/" + this.id + ".jpg",
},
{
	id: 4,
	src: "images/" + this.id + ".jpg",
},
{
	id: 5,
	src: "images/" + this.id + ".jpg",
},
{
	id: 6,
	src: "images/" + this.id + ".jpg",
},
{
	id: 7,
	src: "images/" + this.id + ".jpg",
},
{
	id: 8,
	src: "images/" + this.id + ".jpg",
},
{
	id: 9,
	src: "images/" + this.id + ".jpg",
},
{
	id: 10,
	src: "images/" + this.id + ".jpg",
},
{
	id: 11,
	src: "images/" + this.id + ".jpg",
},
{
	id: 12,
	src: "images/" + this.id + ".jpg",
},
{
	id: 13,
	src: "images/" + this.id + ".jpg",
},
{
	id: 14,
	src: "images/" + this.id + ".jpg",
},
{
	id: 15,
	src: "images/" + this.id + ".jpg",
},
{
	id: 16,
	src: "images/" + this.id + ".jpg",
},
{
	id: 17,
	src: "images/" + this.id + ".jpg",
},
{
	id: 18,
	src: "images/" + this.id + ".jpg",
},
{
	id: 19,
	src: "images/" + this.id + ".jpg",
},
{
	id: 20,
	src: "images/" + this.id + ".jpg",
},
{
	id: 21,
	src: "images/" + this.id + ".jpg",
},
{
	id: 22,
	src: "images/" + this.id + ".jpg",
},
{
	id: 23,
	src: "images/" + this.id + ".jpg",
},
{
	id: 24,
	src: "images/" + this.id + ".jpg",
},
{
	id: 25,
	src: "images/" + this.id + ".jpg",
},
{
	id: 26,
	src: "images/" + this.id + ".jpg",
},
{
	id: 27,
	src: "images/" + this.id + ".jpg",
},
{
	id: 28,
	src: "images/" + this.id + ".jpg",
},
{
	id: 29,
	src: "images/" + this.id + ".jpg",
},
{
	id: 30,
	src: "images/" + this.id + ".jpg",
}];