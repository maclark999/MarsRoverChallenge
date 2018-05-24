'use strict';

const global = require('../src/global');

const orientations = ["n", "e", "s", "w"];

const movements = {
	n: {
		l: function(rover) {
			rover.orientation = 'w'
		},
		r: function(rover) {
			rover.orientation = 'e'
		},
		m: function(rover) {
			rover.y++
		}
	},
	e: {
		l: function(rover) {
			rover.orientation = 'n'
		},
		r: function(rover) {
			rover.orientation = 's'
		},
		m: function(rover) {
			rover.x++
		}
	},
	s: {
		l: function(rover) {
			rover.orientation = 'e'
		},
		r: function(rover) {
			rover.orientation = 'w'
		},
		m: function(rover) {
			rover.y--
		}
	},
	w: {
		l: function(rover) {
			rover.orientation = 's'
		},
		r: function(rover) {
			rover.orientation = 'n'
		},
		m: function(rover) {
			rover.x--
		}
	}
}
function Rover(name, position) {
	this.name = name;
	this.movements = movements;
	this.x;
	this.y;
	this.orientation;
	this.startingPosition;
	//check to make sure rover position has correct format and all values exist, if not, return 0 0 N
	(() => {
		if (position) {
			let positionArr = position.split(' ');
			let x = positionArr[0];
			let y = positionArr[1];
			let startingOrientation = positionArr[2] ? positionArr[2].toLowerCase() : null;
			const xExists = x && global.isANumber(x);
			const yExists = y && global.isANumber(y);
			const startingOrientationExists = startingOrientation && orientations.includes(startingOrientation);

			if (xExists && yExists && startingOrientationExists) {
				this.x = parseInt(x);
				this.y = parseInt(y);
				this.orientation = startingOrientation;
				this.startingPosition = x + ' ' + y + ' ' + startingOrientation.toUpperCase();
			} else {
				this.x = 0;
				this.y = 0;
				this.orientation = 'N';
				this.startingPosition = '0 0 N';
			}
		}
	})();
}

Rover.prototype.moveRover = function(directions) {
	directions = directions.split('');
	for (let i = 0; i < directions.length; i++) {
		const orientation = this.orientation.toLowerCase();
		//find current orientation object in movements object
		const currentOrientation = this.movements[orientation];
		const move = directions[i].toLowerCase();
		//set new value for rover position based on directions
		currentOrientation[move](this);
	}
	return [this.x, this.y, this.orientation.toUpperCase()];
};

module.exports = Rover;
