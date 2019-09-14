import Location from "/static/location.js";
import Vector from "/static/Vector.js";

export default class Individual {
	constructor(props) {
		this.state = {
			canvas: props.canvas,
			grid: props.grid,
			world: props.world,
			house: props.house,
			wellbeing: props.wellbeing,
			wealth: props.wealth,
			firm: props.firm,
			payRate: props.payRate,
			foodPrice: props.foodPrice
		};
		this.state.grid.get_location(props.row, props.col).add(this);
		this.vector = new Vector(props.col*20, props.row*20),
		this.img;
		this.drawn = false;
	}

	isAtLocation(x, y) {
		return this.vector.x == x && this.vector.y == y
	}

	
	swap(available_houses, house){
		var temp = this.state.house;
		this.state.house = house;
		available_houses.push(temp)
		var x = available_houses.indexOf(house)
		if(x != -1){
			available_houses.splice(x, 1)
		}
	}

	handle_houses(start_wealth, available_houses){
		if(this.state.wealth - start_wealth > 0 && this.state.wealth > this.state.rent + this.state.foodPrice){
			// If you are saving money this year and have enough to pay for next month's food and rent, then you can move out
			for(let i = this.state.house.col-1; i > 33; i--){
				for(let x = 0; x < available_houses.length; x++){
					if(available_houses[x].col == i){
						this.swap(available_houses, available_houses[x])
					}
				}
			}
			// Buy better house
		} else if (this.state.wealth - start_wealth < 0 && this.state.wealth < 800){
			// If you had to tap into savings this year and have less than 800 in wealth then move out
			for(let i = this.state.house.col+1; i < 64; i++){
				for(let x = 0; x < available_houses.length; x++){
					if(available_houses[x].col == i){
						this.swap(available_houses, available_houses[x])
					}
				}
			}
			// Buy worse house
		}
	}

	checkLocations(c, r, err){
		for(let i = 0; i <= err; i++){
			var x = (c+i)*20
			var y = (r)*20
			if(this.isAtLocation(x, y)){
				return true;
			}
			x = (c-i)*20
			y = (r)*20
			if(this.isAtLocation(x, y)){
				return true;
			}
		}
		return false;
	}


	draw() {
		if (this.drawn) {
			if (!(this.checkLocations(this.state.house.state.col, this.state.house.state.row, 0) ||
			this.checkLocations((this.state.firm.state.col), this.state.firm.state.row, 0))) {
				if (this.img == null){
					this.img = new Image(20, 20);
				}
				if (this.state.wellbeing > (0.8)){
					this.img.src = '/static/newHappy.png';
				}
				else if (this.state.wellbeing > (0.6)){
					this.img.src = '/static/neutral.png';
				}
				else{
					this.img.src = '/static/newSad.png';
				}

				const context = this.state.canvas.getContext('2d');
				context.drawImage(this.img, this.vector.x, this.vector.y);
			}
		}
		else {
			if (this.img == null){
				this.img = new Image(20, 20);
			}

			if (this.state.wellbeing > (0.7)){
				this.img.src = '/static/newHappy.png';
			}
			else if (this.state.wellbeing > (0.4)){
				this.img.src = '/static/neutral.png';
			}
			else{
				this.img.src = '/static/newSad.png';
			}

			const context = this.state.canvas.getContext('2d');
			context.drawImage(this.img, this.vector.x, this.vector.y);
			this.drawn = true;
		}
	}

	purchaseProducts() {
		var temp = 0;
		while(this.state.wellbeing < 0.75){
			if(this.state.firm.product > 0){
				if(this.state.wealth > this.state.firm.productPrice){
					this.state.wellbeing += this.state.firm.productWellBeing
					this.state.firm.product -= 1;
					this.state.firm.revenue += this.state.firm.productPrice
				} else {
					break
				}
			}
		}
	}

	update(available_houses){
		var consumption = 0;
		var start_wealth = this.state.wealth
		this.state.wealth += this.state.payRate
		this.state.firm.expenses += this.state.payRate
		this.state.wealth -= this.state.house.rent
		this.purchaseProducts()
		// this.state.wellbeing = (this.state.payRate + 800*(1-this.state.grid.grid[this.state.house.state.row][this.state.house.state.col].pollution) ) / 2000
		this.state.wellbeing = this.state.payRate / 1200
		this.handle_houses(start_wealth, available_houses)
	}
}
