var AI = function() {
	controlPanel.style.display = "none";
	//switch(computer.ship.name) {
	//	case "Галеон":
			// поулчить стоимость ходов
			// если стоимость сближения 2, то стрельба, если 1, то сближение, если 0, то сближение и абордаж
			if (game.distance) switch(game.wind) {
				case "north": if (computer.ship.name == "Галеон") return fire.click();
				case "east":
				case "west":
				case "south": return move.click();
			} else return grapple.click();
	//}
};