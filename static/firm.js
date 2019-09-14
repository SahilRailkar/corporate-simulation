 import Grid from "/static/grid.js";
import Location from "/static/location.js";
import Vector from "/static/Vector.js";
import SharePrice from "/static/sharePrice.js";

export default class Firm {
	constructor(props, productPrice, productWellBeing) {
		this.sharePrice = 100;
		this.waste_reduction = 0;

		this.state = {
			number: props.number,
			canvas: props.canvas,
			grid: props.grid,
			row: props.row,
			col: props.col,
			vector: new Vector(props.col*20, props.row*20),
			world: props.world,
			salary: props.salary,
			importances: props.importances
		};

		this.state.sharePrice = new SharePrice(this.state.canvas, this.sharePrice, (this.state.col - 1)*20, (this.state.row - 2) * 20 - 5);

		this.state.grid.get_location(this.state.row, this.state.col).add(this);
		for (let i = -2; i <= 2; i++) {
			for (let j = -2; j <= 2; j++) {
				if (i == 0 && j == 0) {
					continue;
				}
				else {
					this.state.grid.get_location(this.state.row + i, this.state.col + j).add(new Object());
				}
			}
		}

		this.product = 100;
		this.resources = 100;
		this.revenue = 0;
		this.expenses = 0;
		this.waste = 0;
		this.resource_to_product = 1;
		this.productPrice = productPrice;
		this.productWellBeing = productWellBeing;
		this.workers = new Array();
		this.directors = new Array();
		this.img;

		this.update_const = 0.1;
		this.drawn = false;
	}

	draw() {
		if (this.img == null) {
			this.img = new Image(80, 80);
			this.img.src = '/static/firm.png';
			this.img.setAttribute("id", "firm" + this.state.number.toString())
		}
		const context = this.state.canvas.getContext('2d');
		context.drawImage(this.img, this.state.vector.x - 20, this.state.vector.y - 20);
		if (this.drawn) {
			this.state.sharePrice.draw();
		}
	}

	update() {
		var waste_this_turn = 0
		for (let i = 0; i < this.workers.length; i++){
			if(this.resources < this.resource_to_product){
				this.resources+=3;
				waste_this_turn+=3;
			} else {
				this.product+=3;
				this.resources -= 3*this.resource_to_product
			}
		}
		this.updateSharePriceText()
		return waste_this_turn - this.waste_reduction;
	}

	implement_decision(decision) {
		this.sharePrice = this.sharePrice + 10 * (decision.impacts.sharePrice - 0.33)
		for (let i = 0; i < this.workers.length; i++) {
			this.workers[i].state.payRate = this.workers[i].state.payRate + 500 * (decision.impacts.employeeWage - 0.33);
		}
		const rate1 = 100.0;
		const rate2 = 20.0;
		for (let j = 0; j < this.state.grid.grid.length; j++) {
			for (let k = 0; k < this.state.grid.grid[j].length; k++) {
				this.state.grid.get_location(j, k).pollution = this.state.grid.get_location(j, k).pollution + (0.5-decision.impacts.environmentalImpact) * rate2/this.state.vector.distance(new Vector(k*20, j*20));				
				if (decision.impacts.environmentalImpact < 0.33) {
					this.state.waste_reduction = -10
				} else if (decision.impacts.environmentalImpact < 0.51){
					this.state.waste_reduction = 90
				}
			}
		}	
	}

	makeDecision(decisions) {
		let decision1 = decisions[0];
		let decision2 = decisions[1];

		let decision1Impacts = decision1.impacts;
		let decision2Impacts = decision2.impacts;

		let spImportance = this.state.importances["spImportance"];
		let ewImportance = this.state.importances["ewImportance"];
		let eiImportance = this.state.importances["eiImportance"];

		let v_1 = spImportance * decision1Impacts.sharePrice + ewImportance * decision1Impacts.employeeWage + eiImportance * decision1Impacts.environmentalImpact;
		let v_2 = spImportance * decision2Impacts.sharePrice + ewImportance * decision2Impacts.employeeWage + eiImportance * decision2Impacts.environmentalImpact;

		if (v_1 >= v_2) {
			return decision1;
		}
		else {
			return decision2;
		}
	}

	updateImportance(decisionMade) {
		let max = decisionMade.largest_impact;

		let equivalences = {
			sharePrice: "spImportance",
			employeeWage: "ewImportance",
			environmentalImpact: "eiImportance"
		}

		max = equivalences[max]
		let diff = this.update_const;
		if (this.state.importances[max] + diff <= 1.0) {
			this.state.importances[max] += diff;
			let keys = Object.keys(this.state.importances);
			let dec = diff/(keys.length - 1)
			for (let i = 0; i < keys.length; i++) {
				let key = keys[i]
				if (key != max) {
					if (this.state.importances[key] - dec < 0) {
						diff -= (dec - this.state.importances[key]);
						this.state.importances[key] = 0;
					}
					else {
						this.state.importances[key] -= dec;
					}
				}
			}
		}
		else {
			diff = 1.0 - this.state.importances[max];
			this.state.importances[max] = 1.0;
			let keys = Object.keys(this.state.importances);
			for (let i = 0; i < keys.length; i++) {
				let key = keys[i]
				if (key != max) {
					if (this.state.importances[key] - diff < 0) {
						diff -= (dec - this.state.importances[key]);
						this.state.importances[key] = 0;
					}
					else {
						this.state.importances[key] -= diff;
					}
				}
			}
		}
		return diff;
	}

	updateSharePriceText() {
		this.sharePrice = parseInt(this.sharePrice, 10);
		this.state.sharePrice.state.value = this.sharePrice;
	}
}
