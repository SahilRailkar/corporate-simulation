export default class SharePrice {
	constructor(canvas, value, x, y) {
		this.state = {}
		this.state.canvas = canvas;
		this.state.value = value;
		this.state.x = x;
		this.state.y = y;
	}

	draw() {
		const ctx = this.state.canvas.getContext('2d');
		ctx.fillStyle = "white";
		ctx.font = "15px Roboto";
		ctx.fillText("Share price: " + this.state.value.toString(), this.state.x - 25, this.state.y + 17.5);
	}
}