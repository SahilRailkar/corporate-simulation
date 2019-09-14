 import Location from "/static/location.js";
import Vector from "/static/Vector.js";

export default class Grid {
	constructor(canvas, world) {
		this.grid = new Array(36);
		for (let i = 0; i < 36; i++) {
			this.grid[i] = new Array(64);
			for (let j = 0; j < 64; j++) {
				this.grid[i][j] = new Location(canvas, j * 20, i * 20);
			}
		}
		this.world = world;
	}

	get_location(row, col) {
		return this.grid[row][col];
	}

	set_location(row, col, location) {
		this.grid[row][col] = location;
	}

	draw() {
		for (let i = 0; i < 36; i++) {
			for (let j = 0; j < 64; j++) {
				this.grid[i][j].draw_pollution();
			}
		}
		for (let i = 0; i < 36; i++) {
			for (let j = 0; j < 64; j++) {
				this.grid[i][j].draw_values();
			}
		}
	}

	calculate_pollution(row, col, firm_waste, firm){
		return (firm_waste/60)/(firm.state.vector.distance(new Vector(col*20, row*20)))

	}

	update(waste_per_firm, firms){
		for(let i = 0; i < 36; i++){
			for (let x = 0; x < 64; x++){
				this.grid[i][x].update(this.grid);
			}
		}
	}
}
