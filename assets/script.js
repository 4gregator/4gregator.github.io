window.onload = function() {
	addendA.innerHTML = a;
	addendB.innerHTML = b;
	context.drawImage(img, 0, 50);
	draw(xBase, xFirst, a, left, first);
};

var addendA = document.getElementById("addendA");
var addendB = document.getElementById("addendB");
var total = document.getElementById("total");
var sum = document.getElementById("sum");
var canvas = document.getElementById("scale");
var context = canvas.getContext("2d");
var left = document.getElementsByClassName("addendum")[0];
var right = document.getElementsByClassName("addendum")[1];
var first = document.getElementById("firstIn");
var second = document.getElementById("secondIn");
var a = randomInt(6, 9);
var c = randomInt(11, 14);
var b = c - a;
var addendMax = 9;
var xBase = 35.5;
var xFirst = xBase + a * 39;
var xSecond = xFirst + b * 39;

function draw(first, second, a, input, id) {
	var yBase = 70;
	var yMod = yBase - a * 10;
	var yModLeft = yBase - 8;
	var yModRight = yBase - 9;
	var xModLeft = second - 5;
	var xModRight = second + 4;
	context.strokeStyle = "purple";
	context.moveTo(first, yBase);
	context.bezierCurveTo(first, yMod, second, yMod, second, yBase);
	context.moveTo(second, yBase);
	context.lineTo(xModLeft, yModLeft);
	context.moveTo(second, yBase);
	context.lineTo(xModRight, yModRight);
	context.stroke();
	input.setAttribute("type", "text");
	id.style.width = second - first + 'px';
	input.style.top = (addendMax - a) * 7 + 'px';
}

function randomInt(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

left.onchange = function() {
	if (left.value != a) {
		left.style.color = "red";
		addendA.style.backgroundColor = "orange";
		addendA.style.borderRadius = "5px";
	} else {
		left.setAttribute("disabled", "disabled");
		left.style.color = "black";
		left.style.border = "none";
		left.style.backgroundColor = "white";
		addendA.style.backgroundColor = "white";
		draw(xFirst, xSecond, b, right, second);
	}
};
left.onfocus = function(){
	left.style.color = "black";
};

right.onchange = function() {
	if (right.value != b) {
		right.style.color = "red";
		addendB.style.backgroundColor = "orange";
		addendB.style.borderRadius = "5px";
	} else {
		right.setAttribute("disabled", "disabled");
		right.style.color = "black";
		right.style.border = "none";
		right.style.backgroundColor = "white";
		addendB.style.backgroundColor = "white";
		total.innerHTML = "";
		sum.setAttribute("type", "text");
	}
};
right.onfocus = function(){
	right.style.color = "black";
};

sum.onchange = function() {
	if (sum.value != c) {
		sum.style.color = "red";
	} else {
		sum.setAttribute("disabled", "disabled");
		sum.style.color = "black";
		sum.style.border = "none";
		sum.style.backgroundColor = "white";
		alert("пример решен правильно!");
	}
};
sum.onfocus = function() {
	sum.style.color = "black";
};