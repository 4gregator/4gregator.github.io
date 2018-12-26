var AI = function() {
	controlPanel.style.display = "none";
	//switch(computer.ship.name) {
	//	case "Галеон":
			// поулчить стоимость ходов
			// если стоимость сближения 2, то стрельба, если 1, то сближение, если 0, то сближение и абордаж
			if (computer.ship.name == "Галеон") {
				let activeGuns = function() {
					switch(computer.ship.direction) {
						case "top": return computer.ship.guns.top;
						case "bottom": return computer.ship.guns.bottom;
						case "left": return computer.ship.guns.right;
						case "right": return computer.ship.guns.left;
					}
				};
				return activeGuns().length > 1 && !fire.disabled ? fire.click() : turnRight.click();
			}
			else return game.distance ? move.click() : grapple.click();
			console.log("AI error");
	//}
};