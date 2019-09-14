import Individual from "/static/individual.js";
import Worker from "/static/worker.js";
import Director from "/static/director.js";
import Grid from "/static/grid.js";
import Location from "/static/location.js";
import Firm from "/static/firm.js";
import House from "/static/house.js";
import World from "/static/world.js";
import Vector from "/static/Vector.js";

export default class Instantiate {
	constructor(grid, canvas, world) {
		this.firm_1_props = {
			number: 1,
			canvas: canvas,
			grid: grid,
			row: 17,
			col: 32,
			world: world,
			salary: 10,
			importances: {
				spImportance: 1/3,
				ewImportance: 1/3,
				eiImportance: 1/3
			}
		};

		this.firm_2_props = {
			number: 2,
			canvas: canvas,
			grid: grid,
			row: 9,
			col: 12,
			world: world,
			salary: 10,
			importances: {
				spImportance: 1,
				ewImportance: 0,
				eiImportance: 0
			}
		};

		this.firm_3_props = {
			number: 3,
			canvas: canvas,
			grid: grid,
			row: 9,
			col: 52,
			world: world,
			salary: 10,
			importances: {
				spImportance: 0,
				ewImportance: 1,
				eiImportance: 0
			}
		};

		this.firm_4_props = {
			number: 4,
			canvas: canvas,
			grid: grid,
			row: 26,
			col: 12,
			world: world,
			salary: 10,
			importances: {
				spImportance: 0,
				ewImportance: 0,
				eiImportance: 1
			}
		};

		this.firm_5_props = {
			number: 5,
			canvas: canvas,
			grid: grid,
			row: 26,
			col: 52,
			world: world,
			salary: 10,
			importances: {
				spImportance: 1/3,
				ewImportance: 1/3,
				eiImportance: 1/3
			}
		};

		this._firmhouse = [[], [], [], [], []]
	}

	instantiate_houses(grid, canvas, world, firms) {
		var _firms = [this.firm_1_props,this.firm_2_props,this.firm_3_props,this.firm_4_props,this.firm_5_props]
		var temp = new Array();
		var max_variable_rent = 3000;
		var base_rent = 1000;
		// Initializes Houses
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 50; j++) {
				var r = _firms[i].row
				var c = _firms[i].col
				var row = 0
				var col = 0
				if (Math.random() > 0.5) {
					row = r + 3 + (Math.floor(Math.random() * 6));
				} else {
					row = r - 3 - (Math.floor(Math.random() * 6));
				}
				if (Math.random() > 0.5) {
					col = c + 3 + (Math.floor(Math.random() * 6));
				} else {
					col = c - 3 - (Math.floor(Math.random() * 6));
				}

				var indVec = new Vector(col,row);
				var minDist = 100000;
				var connectedFirm = firms[0];
				for(let x = 0; x<firms.length; x++)
				{
					var firmVec = new Vector(firms[x].state.col, firms[x].state.row);
					var tempDist = indVec.distance(firmVec);
					if(tempDist < minDist)
					{
						minDist = tempDist;
						connectedFirm = firms[x];
					}
				}

				var props = {
					canvas: canvas,
					grid: grid,
					row: row,
					col: col,
					world: world,
					firm: connectedFirm,
					occupied: false,
					pollution: 0,
					rent: base_rent/10 + ((col%34)/31)*max_variable_rent //based on national averages

				};
				var house = new House(props);
				house.state.firm = firms[i];
				temp.push(house);
				this._firmhouse[i].push(house)
			}
		}
		return temp
	}

	instantiate_individuals(availableHouses, canvas, grid, world, firms) {
		let temp = new Array();
		let max_variable_rent = 3000;
		let base_rent = 7500;
		for (let i = 0; i < 5; i++) {
		 	let firm = world.state.firms[i];
		 	var houses = this._firmhouse[i]
			for (let j = 0; j < 40; j++) {
				let house = houses[j];
				if (house.state.firm != firm) {
					console.log(firm.state.row, firm.state.col, house.state.firm.state.row, house.state.firm.state.col)
				}
				var props = {
					canvas: canvas,
					grid: grid,
					row: house.state.row,
					col: house.state.col,
					world: world,
					house: house,
					wellbeing: 1.0,
					wealth: 800,
					firm: firm,
					payRate: 800,
					foodPrice: 300
				};
				var individual = new Worker(props);
				temp.push(individual);
				firm.workers.push(individual);
			}

			for (let k = 0; k < 10; k++) {
				let house = houses[40+k];
				house.state.firm = firm;

				var props = {
					canvas: canvas,
					grid: grid,
					row: house.state.row,
					col: house.state.col,
					world: world,
					house: house,
					wellbeing: 1.0,
					wealth: 800,
					firm: firm,
					payRate: (firm.state.sharePrice.state.value/5) * 40,
					foodPrice: 300
				};
				var selections = ["shareholderSelected", "employeeSelected", "environmentSelected"];
				var selection = selections[Math.floor(Math.random() * selections.length)];
				var individual = new Director(props, selection);
				temp.push(individual);
				firm.directors.push(individual);
			}
		}
		return temp;
	}
}
