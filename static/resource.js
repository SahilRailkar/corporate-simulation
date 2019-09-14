import Vector from "/static/Vector.js";

export default class Resource {
	constructor(props) {
		this.state = {
			canvas: props.canvas,
			grid: props.grid,
			vector: new Vector(props.x, props.y)
		}
	}

	draw() {
		const context = this.state.canvas.getContext('2d');
		ctx.fillRect(this.vector.x, this.vector.y, 20, 20);
	}


}
