var player = {
	gender: false,
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
				computer.init();
				console.log(player.gender);
				console.log(computer.gender);
			});
		}
	}
},
computer = {
	gender: false,
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
	render: function() {
		document.getElementById("play").addEventListener('click', function() {
			document.getElementById("start").style.display = "none";
			popup.style.display = "block";
			player.init(document.getElementsByClassName("gender"));
		});
	},
},
popup = document.getElementById("dialog");

window.addEventListener('load', function() {
	game.render();
});

function random(min, max){
	return Math.floor(Math.random() * (max + 1 - min) + min);
};