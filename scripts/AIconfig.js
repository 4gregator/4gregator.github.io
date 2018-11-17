var AI = function() {
	return new Promise(function(resolve) {
		switch(computer.ship.name) {
			case "Галеон":
				// поулчить стоимость ходов
				// если стоимость сближения 2, то стрельба, если 1, то сближение, если 0, то сближение и абордаж
				if (game.distance) switch(game.wind) {
					case "north":
						computer.ship.movePts--;
						return game.renderFire.call(computer).then(function() {
							return resolve();
						});
						break;
					case "east":
					case "west":
						computer.ship.movePts--;
						game.move();
						return resolve();
					case "south":
						computer.ship.movePts--;
						game.move();
						return game.closeCombat().then(function(btn) {
							btn.onclick = function() {
								dialog.style.display = "none";
								return resolve();
							};
						});
				} else return game.closeCombat().then(function(btn) {
					btn.onclick = function() {
						dialog.style.display = "none";
						return resolve();
					};
				});
		}
	});
};