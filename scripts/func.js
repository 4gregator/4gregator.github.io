let strataCarousel = function(change) {
	let div = document.createElement("div"),
		left = document.createElement("img"),
		right = document.createElement("img"),
		img = document.createElement("img"),
		btn = document.createElement("button"),
		stratas = document.getElementsByClassName("strata"),
		i = 0, click = function() {
			playField.removeChild(div);
			player.hand.splice(i, 1);
			hand.removeChild(stratas[i]);
			game.takeStrata();
			player.renderStrata();
		};
	change = change == true ? true : false;
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
	if (change) {
		img.addEventListener('click', click);
	} else {
		img.addEventListener('click', function() {
			if (player.hand[i].active) {
				playField.removeChild(div);
				player.hand[i].effect();
			}
		});
	}
	right.src = "images/right.png";
	right.className = "arrows";
	div.appendChild(right);
	right.addEventListener('click', function() {
		i = i + 1 == stratas.length ? 0 : ++i;
		img.src = stratas[i].src;
	});
	btn.id = "closeCarousel";
	btn.innerHTML = change ? "сбросить страту" : "закрыть";
	div.appendChild(btn);
	if (change) {
		btn.addEventListener('click', click);
	} else {
		btn.addEventListener('click', function() {
			playField.removeChild(div);
		});
	}
},
introduction = function() {
	let img = document.createElement("img");
	img.className = "intro";
	img.src = "images/load.jpg";
	document.body.firstElementChild.insertBefore(img, document.body.firstElementChild.firstElementChild);
	img.addEventListener('click', function() {
		document.body.firstElementChild.removeChild(img);
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

window.addEventListener('load', introduction());