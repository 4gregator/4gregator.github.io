class Strata {
	constructor(elem, that, trigger, condition, effect) {
		this.elem = elem;
		this.owner = that;
		this.trigger = trigger;
		this.condition = condition;
		this.active = false;
		this.effect = effect;
		this.init();
	}
	init() {
		let self = this;
		this.elem.addEventListener(this.trigger, function() {
			if (self.condition()) {
				self.active = true;
				this.classList.add("init");
				this.addEventListener('click', self.activation.bind(self));
			}
		});
	}
	activation() {
		if (this.owner == player) hand.removeChild(this.elem);
		this.owner.hand.splice(this.owner.hand.indexOf(this), 1);
		this.effect();
	}
	deactivation() {
		let self = this;
		this.active = false;
		this.elem.classList.remove("init");
		this.elem.removeEventListener('click', self.activation.bind(self));
	}
};

var strataChange = new Event('strataChange'),
	firstMove = new Event('firstMove'),
	permanent = new Event('permanent'),
	maneuver = new Event('maneuver'),
	approaching = new Event('approaching'),
	afterShooting = new Event('afterShooting'),
	beforeFighting = new Event('beforeFighting'),
	stratagems = [{
	id: 1,
	active: function() {
		if (this.owner.move && !game.distance) return true;
	},
	trigger: "afterShooting",
	effect: function() {
		game.move();
	}
},
{
	id: 2,
	active: function() {
		if (this.owner.move) return true;
	},
	trigger: "beforeFighting",
	effect: function() {
		let id = this.owner == player ? "plr" : "opp",
			dice = document.createElement("img");
		dice.className = "dices grappleDices";
		dice.src = "images/dice.gif";
		dice.setAttribute("own", id);
		document.getElementById(id).appendChild(dice);
	}
},
{
	id: 3,
	active: function() {return true;},
	trigger: "permanent",
	effect: function() {
		if (player.ship.name == "Фрегат") ++this.owner.ship.evasion;
		if (computer.ship.name == "Фрегат") ++this.owner.ship.evasion;
		game.setArms.call(this.owner);
	}
},
{
	id: 4,
	active: function() {
		if (this.owner.move && this.owner.ship.reloading.indexOf(this.owner.ship.direction) == -1) return true;
	},
	trigger: "maneuver",
	effect: function() {
		console.log("use strata shoot");
		game.deactivation();
		game.renderFire.call(this.owner).then(function(result) {
			result.onclick = function() {
				dialog.style.display = "none";
				if (player.move) game.renderControl(player.ship.movePts);
			};
		});
		this.owner.ship.reloading.push(this.owner.ship.direction);
	}
},
{
	id: 5,
	active: function() {return true;},
	trigger: "permanent",
	effect: function() {
		if (player.ship.name == "Галеон") ++this.owner.ship.evasion;
		if (computer.ship.name == "Галеон") ++this.owner.ship.evasion;
		game.setArms.call(this.owner);
	}
},
{
	id: 6,
	active: function() {
		if (!this.owner.move) return true;
	},
	trigger: "approaching",
	effect: function() {
		let target = this.owner != player ? player : computer;
		if (target.ship.evasion > 0) --target.ship.evasion;
		game.setArms.call(target);
	}
},
{
	id: 7,
	active: function() {
		if (!this.owner.move) return true;
	},
	trigger: "maneuver",
	effect: function() {
		let target = this.owner != player ? player : computer;
		target.ship.reloading = ["top", "right", "bottom", "left"];
	}
},
{
	id: 8,
},
{
	id: 9,
},
{
	id: 10,
},
{
	id: 11,
},
{
	id: 12,
},
{
	id: 13,
},
{
	id: 14,
},
{
	id: 15,
},
{
	id: 16,
	active: function() {
		if (!this.owner.move) return true;
	},
	trigger: "firstMove",
	effect: function() {
		game.changeMove();
	}
},
{
	id: 17,
},
{
	id: 18,
},
{
	id: 19,
},
{
	id: 20,
},
{
	id: 21,
	active: function() {return true;},
	trigger: "strataChange",
	effect: function() { //сделать для компа
		strataCarousel(true);
	}
},
{
	id: 22,
},
{
	id: 23,
},
{
	id: 24,
	active: function() {
		if (!this.owner.move) return true;
	},
	trigger: "beforeFighting",
	effect: function() {
		let id = this.owner == player ? "opp" : "plr",
			div = document.getElementById(id),
			arr = div.getElementsByTagName("img");
		if (arr.length > 1) {
			for (let i = 0; i < arr.length; i++) {
				if (i) div.removeChild(arr[i]);
			}
		}
	}
},
{
	id: 25,
	active: function() {return true;},
	trigger: "permanent",
	effect: function() {
		let target = this.owner != player ? player : computer;
		if (target.ship.evasion > 0) --target.ship.evasion;
		game.setArms.call(target);
	}
},
{
	id: 26,
	active: function() {
		if (this.owner.move) {
			game.strataWind = true;
			this.elem.setAttribute("wind", "true");
			return true;
		}
	},
	trigger: "permanent",
	effect: function() {
		game.strataWind = false;
		game.wind = game.changeWind();
	}
},
{
	id: 27,
	active: function() {return true;},
	trigger: "permanent",
	effect: function() {
		let target = this.owner != player ? player : computer;
		if (this.owner.gender == "female") ++this.owner.ship.evasion;
		if (target.gender == "male" && target.ship.evasion > 0) --target.ship.evasion;
		game.setArms.call(this.owner);
		game.setArms.call(target);
	}
},
{
	id: 28,
	active: function() {
		let target = this.owner != player ? player : computer;
		if (this.owner.ship.evasion < target.ship.evasion) return true;
	},
	trigger: "permanent",
	effect: function() { // доделать страту
		let target = this.owner != player ? player : computer;
		if (target.ship.evasion > 0) --target.ship.evasion;
		game.setArms.call(target);
	}
},
{
	id: 29,
},
{
	id: 30,
}];