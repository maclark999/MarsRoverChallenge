const expect = require('expect');
const Grid = require('../src/grid');
const Rover = require('../src/rover');

describe('MARS ROVER', () => {
	it('should create new 5 by 5 grid', () => {
		const grid = new Grid('5 5');
		expect(grid.size).toEqual([5, 5]);
	});

	it('should add new rover to grid', () => {
		const grid = new Grid('5 5');
		const rover = new Rover('rover1', '1 2 N');
		const rover2 = new Rover('rover2', '3 3 E');
		grid.addRover(rover);
		grid.addRover(rover2);
		expect(grid.rovers['rover1']).toBe(rover);
		expect(grid.rovers['rover2']).toBe(rover2);
	});

	it('should move rover to new location given directions', () => {
		const grid = new Grid('5 5');
		const rover = new Rover('rover1', '1 2 N');
		const rover2 = new Rover('rover2', '3 3 E');
		grid.addRover(rover);
		grid.addRover(rover2);
		const newPosition = grid.moveRover(rover, 'LMLMLMLMM');
		const newPosition2 = grid.moveRover(rover2, 'MMRMMRMRRM');
		expect(newPosition).toEqual('1 3 N');
		expect(newPosition2).toEqual('5 1 E');
	});

	describe('ERRORS', () => {
		it('should throw error if add rover position is outside of grid', () => {
			const grid = new Grid('0 0');
			const rover = new Rover('rover1', '1 2 N');

			expect(addRover).toThrow();
			function addRover() {
				grid.addRover(rover);
			}
		});

		it('should throw error if add rover position matches other rover', () => {
			const grid = new Grid('5 5');
			const rover = new Rover('rover1', '1 2 N');
			const rover2 = new Rover('rover2', '1 2 N');
			grid.addRover(rover);
			expect(addRover).toThrow();
			function addRover() {
				grid.addRover(rover2);
			}
		});

		it('should throw error if rover is outside of grid after move', () => {
			const grid = new Grid('3 3');
			const rover = new Rover('rover1', '1 2 N');
			grid.addRover(rover);

			expect(moveRover).toThrow();
			function moveRover() {
				grid.moveRover(rover, 'MMMMMM');
			}
		});
	});
});
