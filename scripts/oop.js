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
	hand: {}
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
	}
},
game = {
	render: function() {
		computer.init();
		let img = document.getElementById("portret"),
			cmpShip = document.getElementById("shipOpponent");

		img.src = "images/" + computer.gender + ".jpg";
		img.style.display = "block";
		cmpShip.src = "images/" + computer.ship.name + "2.jpg";
		cmpShip.style.display = "block";
		console.log(computer.ship.name);
	},
}

window.addEventListener('load', function() {
	game.render();
});

function random(min, max){
	return Math.floor(Math.random() * (max + 1 - min) + min);
};