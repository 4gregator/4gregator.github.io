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
	beforeAction = new Event('beforeAction'),
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
	active: () => true,
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
	active: () => true,
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
		strataDialog.click();
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
		strataDialog.click();
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
	active: function() {
		if (!this.owner.move && game.distance) return true;
	},
	trigger: "beforeAction",
	effect: function() {
		alert("testing");
		// в рендере должна деактивизироваться кнопка сближения до конца хода
		strataDialog.click();
	}
},
{
	id: 13,
	active: function() {
		if (this.owner.move && this.owner.ship.movePts == 1) return true;
	},
	trigger: "permanent",
	effect: function() {
		let target = this.owner != player ? player : computer;
		this.owner.ship.movePts--;
		target.ship.movePts -= 2;
		playField.dispatchEvent(strataAction);
	}
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
	active: () => true,
	trigger: "beforeFighting",
	effect: function() {
		let target = this.owner == player ? "plr" : "opp";
		dialog.getElementsByTagName("button")[0].setAttribute("deuce", target);
	}	
},
{
	id: 21,
	active: () => true,
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
	active: () => true,
	trigger: "beforeFighting",
	effect: function() {
		let target = this.owner == player ? "opp" : "plr";
		dialog.getElementsByTagName("button")[0].setAttribute("cinque", target);
	}		
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
	active: () => true,
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
		if (this.owner.move) return true;
	},
	trigger: "permanent",
	effect: function() {
		game.wind = game.changeWind();
		playField.dispatchEvent(strataAction);
	}
},
{
	id: 27,
	active: () => true,
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
	active: () => true,
	trigger: "firstMove",
	effect: function() {
		if (this.owner == player) computer.hand.splice(random(1, computer.hand.length) - 1, 1);
		// доделать под человека
	}
},
{
	id: 30,
	active: () => true,
	trigger: "permanent",
	effect: function() {
		game.reroll = this.owner == player ? "plr" : "opp";
	}
}];