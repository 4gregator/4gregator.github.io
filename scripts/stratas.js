var strataChange = new Event('strataChange'),
	permanent = new Event('permanent'),
	maneuver = new Event('maneuver'),
	stratagems = [{
	id: 1,
},
{
	id: 2,
},
{
	id: 3,
	init: function(elem, that) {
		let self = this;
		this.elem = elem;
		this.owner = that;
		elem.addEventListener('permanent', function() {
			this.classList.add("init");
			self.active = true;
			this.addEventListener('click', self.effect.bind(that, this));
		});
	},
	effect: function(strata) {
		console.log(hand, strata)
		hand.removeChild(strata);
		if (player.ship.name == "Фрегат") ++this.ship.evasion;
		if (computer.ship.name == "Фрегат") ++this.ship.evasion;
		game.setArms.call(this);
	},
	deactivation: function() {
		let self = this;
		this.elem.classList.remove("init");
		self.active = false;
		this.elem.removeEventListener('click', self.effect.bind(self.owner, this));
	}
},
{
	id: 4,
	init: function(elem, that) {
		let self = this;
		this.elem = elem;
		this.owner = that;
		elem.addEventListener('maneuver', function() {
			if (that.move && that.ship.reloading.indexOf(that.ship.direction) == -1) {
				this.classList.add("init");
				self.active = true;
				this.addEventListener('click', self.effect.bind(that, this));
			};
		});
	},
	effect: function(strata) {
		console.log(hand, strata)
		hand.removeChild(strata);
		game.deactivation();
		game.renderFire.call(this).then(function(result) {
			result.onclick = function() {
				dialog.style.display = "none";
				if (player.move) game.renderControl(player.ship.movePts);
			};
		});
		this.ship.reloading.push(this.ship.direction);
	},
	deactivation: function() {
		let self = this;
		this.elem.classList.remove("init");
		self.active = false;
		this.elem.removeEventListener('click', self.effect.bind(self.owner, this));
	}
},
{
	id: 5,
	init: function(elem, that) {
		let self = this;
		this.elem = elem;
		this.owner = that;
		elem.addEventListener('permanent', function() {
			this.classList.add("init");
			self.active = true;
			this.addEventListener('click', self.effect.bind(that, this));
		});
	},
	effect: function(strata) {
		console.log(hand, strata)
		hand.removeChild(strata);
		if (player.ship.name == "Галеон") ++this.ship.evasion;
		if (computer.ship.name == "Галеон") ++this.ship.evasion;
		game.setArms.call(this);
	},
	deactivation: function() {
		let self = this;
		this.elem.classList.remove("init");
		self.active = false;
		this.elem.removeEventListener('click', self.effect.bind(self.owner, this));
	}
},
{
	id: 6,
},
{
	id: 7,
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
	init: function(elem, that) {
		let self = this;
		this.elem = elem;
		this.owner = that;
		elem.addEventListener('strataChange', function() {
			this.classList.add("init");
			self.active = true;
			this.addEventListener('click', self.effect.bind(that, this));
		});
	},
	effect: function(strata) {
		alert("test");
		console.log("strata test");
	},
	deactivation: function() {
		let self = this;
		this.elem.classList.remove("init");
		self.active = false;
		this.elem.removeEventListener('click', self.effect.bind(self.owner, this));
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
},
{
	id: 25,
	init: function(elem, that) {
		let self = this;
		this.elem = elem;
		this.owner = that;
		elem.addEventListener('permanent', function() {
			this.classList.add("init");
			self.active = true;
			this.addEventListener('click', self.effect.bind(that, this));
		});
	},
	effect: function(strata) {
		console.log(hand, strata)
		hand.removeChild(strata);
		let target = this != player ? player : computer;
		if (target.ship.evasion > 0) --target.ship.evasion;
		game.setArms.call(target);
	},
	deactivation: function() {
		let self = this;
		this.elem.classList.remove("init");
		self.active = false;
		this.elem.removeEventListener('click', self.effect.bind(self.owner, this));
	}
},
{
	id: 26,
},
{
	id: 27,
	init: function(elem, that) {
		let self = this;
		this.elem = elem;
		this.owner = that;
		elem.addEventListener('permanent', function() {
			this.classList.add("init");
			self.active = true;
			this.addEventListener('click', self.effect.bind(that, this));
		});
	},
	effect: function(strata) {
		console.log(hand, strata)
		hand.removeChild(strata);
		let target = this != player ? player : computer;
		if (this.gender == "female") ++this.ship.evasion;
		if (target.gender == "male" && target.ship.evasion > 0) --target.ship.evasion;
		game.setArms.call(this);
		game.setArms.call(target);
	},
	deactivation: function() {
		let self = this;
		this.elem.classList.remove("init");
		self.active = false;
		this.elem.removeEventListener('click', self.effect.bind(self.owner, this));
	}
},
{
	id: 28,
},
{
	id: 29,
},
{
	id: 30,
}];