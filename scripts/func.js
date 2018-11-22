let strataCarousel = function() {
	let div = document.createElement("div"),
		left = document.createElement("img"),
		right = document.createElement("img"),
		img = document.createElement("img"),
		btn = document.createElement("button"),
		stratas = document.getElementsByClassName("strata"),
		i = 0;
	div.id = "strataCarousel";
	playField.insertBefore(div, playField.firstChild);
	left.src = "images/left.png";
	left.className = "arrows";
	div.appendChild(left);
	left.addEventListener('click', function() {
		i = i == 0 ? stratas.length - 1 : --i;
		img.src = stratas[i].src;
	});
	img.id = "strataView";
	img.src = stratas[i].src;
	div.appendChild(img);
	img.addEventListener('click', function() {
		if (player.hand[i].active) {
			playField.removeChild(div);
			useStrata.call(player, player.hand[i].id);
		}
	});
	right.src = "images/right.png";
	right.className = "arrows";
	div.appendChild(right);
	right.addEventListener('click', function() {
		i = i + 1 == stratas.length ? 0 : ++i;
		img.src = stratas[i].src;
	});
	btn.id = "closeCarousel";
	btn.innerHTML = "закрыть";
	div.appendChild(btn);
	btn.addEventListener('click', function() {
		playField.removeChild(div);
	});
};

function random(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
};

function compareRandom(a, b) {
	return Math.random() - 0.5;
};

function sum(a, b) {
	return a + b;
};

let sortArray = function(a, b) {
	return b - a;
};

function sumArray(arr) {
	let result = 0;
	for (let i = 0; i < arr.length; i++) result += arr[i];
	return result;
};

function useStrata(id) {
	if (this.move && this.ship.name != "") {
		for (let i = 0; i < this.hand.length; i++) {
			if (this.hand[i].id == id) {
				if (this == player) hand.removeChild(document.getElementsByClassName("strata")[i]);
				this.hand.splice(i, 1)[0].init();
				break;
			}
		}
	}
};