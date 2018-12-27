var AI = function() {
	controlPanel.style.display = "none";
	//switch(computer.ship.name) {
	//	case "Галеон":
			// поулчить стоимость ходов
			// если стоимость сближения 2, то стрельба, если 1, то сближение, если 0, то сближение и абордаж
			if (computer.ship.name == "Галеон") {
				let guns = computer.ship.guns[activeGuns(computer)];
				return guns.length > 1 && !fire.disabled ? fire.click() : turnRight.click();
			}
			else if (game.distance) return !move.disabled ? move.click() : fire.click();
			else return computer.ship.movePts > 1 && computer.ship.guns["top"].length ? fire.click() : grapple.click();
	//}
};