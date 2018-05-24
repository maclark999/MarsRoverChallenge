'use strict';

const global = require('../src/global');

function Grid(size) {
	this.rovers = {};
	this.size;
	(() => {
		//check to make sure size arg exists and is correct format, else return 0
		if (size && size.length === 3) {
			let gridArr = size.split(' ');
			gridArr = gridArr.map(val => {
				return global.isANumber(val) ? parseInt(val) : 0;
			});
			this.size = gridArr;
		}
	})();
};

Grid.prototype.isValidPosition = function(roverName, coords) {
	const x = coords[0];
	const y = coords[1];
	//check if coords are outside of grid;
	const roverOnGrid = x <= this.size[0] && y <= this.size[1];
	let roverNotOverlapping = true;
	//if more than one rover on grid, make sure new rover is not overlapping
	if(Object.keys(this.rovers).length > 1) {
		for (let rover in this.rovers) {
			// skip loop if the property is from prototype
			if (!this.rovers.hasOwnProperty(rover)) continue;
			const roverDetail = this.rovers[rover];
			//if not the current rover
			if (roverDetail.name !== roverName) {
				const passedInCoords = coords.join('');
				const roverDetailCoords = `${roverDetail.x}${roverDetail.y}`;
				//check if coordinates match exactly
				roverNotOverlapping = passedInCoords !== roverDetailCoords;
			}
		}
	}
	if (x <= this.size[0] && y <= this.size[1] && roverNotOverlapping) {
		return true;
	}

	return false;
};

Grid.prototype.addRover = function(rover) {
	this.rovers[rover.name] = rover;
	if (this.isValidPosition(rover.name, [rover.x, rover.y])) {
			console.log(`name ${rover.name} has been added to grid! It's starting position is: ${rover.startingPosition}`);
	} else {
		console.log(`Please update starting position for ${rover.name}`);
		throw new Error(`Please update starting position for ${rover.name}`);
	}
}

Grid.prototype.moveRover = function(rover, directions) {
	const movedPosition = rover.moveRover(directions);
	if(this.isValidPosition(rover.name, [movedPosition[0], movedPosition[1]])) {
		console.log(`${rover.name}'s new position is: ${movedPosition.join(' ')}`);
		return movedPosition.join(' ');
	} else {
		console.log(`Help! ${rover.name} has fallen and it can\'t get up.`);
		throw new Error(`${rover.name} has fallen over edge or has collided with another rover.`);
	}
}

module.exports = Grid;
