import Vector from "/static/Vector.js";
import Individual from "/static/individual.js"
import House from "/static/house.js"

function interpolateColors(color1, color2, factor) {
    var color = color1.slice();
    for (var i = 0; i < 3; i++) {
        color[i] = Math.round(color[i] + factor * (color2[i] - color1[i]));
    }
    return color;
}

export default class Location {
	constructor(canvas, x, y) {
		this.values = new Array();
		this.pollution = 0;
		this.canvas = canvas;
		this.vector = new Vector(x, y);
	}

	draw_pollution() {
		var green = [50, 205, 50];
		var brown = [111, 99, 75];

		const context = this.canvas.getContext('2d');

		if (this.pollution < 0) {
			this.pollution = 0;
		}
		else if (this.pollution > 1) {
			this.pollution = 1;
		}

	    var color = interpolateColors(green, brown, this.pollution);

	    context.fillStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")"
		context.fillRect(this.vector.x,this.vector.y, 20, 20)
	}

	draw_values() {
		if (this.values.length != 0) {
			for (var i = 0; i < this.values.length; i++) {
				if(this.values[i] instanceof Individual){

				} else {
					if (typeof this.values[i].draw === 'function') {
						this.values[i].draw();
					}
				}
			}
		}
	}

	add(value) {
		this.values.push(value);
	}

	
	update(grid){
		for(let i = 0; i < this.values.length; i++){
			if(this.values[i] instanceof House){
				this.values[i].state.pollution = this.pollution
			}
		}
	}
	
}
