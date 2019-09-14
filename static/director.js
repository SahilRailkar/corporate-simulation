import Individual from "/static/individual.js";
import Decision from "/static/decision.js";

export default class Director extends Individual {
	constructor(props, selection) {
		super(props);
		this.selection = selection;
	}
}
