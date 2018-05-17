window.onload = function() {
	addendA.innerHTML = a;
	addendB.innerHTML = b;
	context.drawImage(img, 0, 50);
	draw(x1, x2, a, left, first);
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
var aArr = [6, 7, 8, 9];
var cArr = [11, 12, 13, 14];
var rA = Math.floor(Math.random() * aArr.length);
var rC = Math.floor(Math.random() * cArr.length);
var a = aArr[rA];
var c = cArr[rC];
var b = c - a;
var x1 = 35.5;
var x2 = x1 + a * 39;
var x3 = x2 + b * 39;

function draw(x1, x2, a, input, id) {
	context.strokeStyle = "purple";
	context.moveTo(x1, 70);
	context.bezierCurveTo(x1, -20, x2, -20, x2, 70);
	context.stroke();
	input.setAttribute("type", "text");
	id.style.width = x2 - x1 + 'px';
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
		draw(x2, x3, b, right, second);
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