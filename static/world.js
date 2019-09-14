import Decision from '/static/decision.js';

export default class World {
	constructor(props) {
		this.state = {
			individuals: props.individuals,
			firms: props.firms,
			houses: props.houses
		}
		this.all_decisions = new Array();
	}

	generateDecisions(playerType) {
		let all_decisions_values = [[[0.8, 0.1, 0.1], [0.1, 0.8, 0.1], 1], [[0.8, 0.1, 0.1], [0.1, 0.1, 0.8], 2], [[0.1, 0.8, 0.1], [0.1, 0.1, 0.8], 3], [[1.0, 0.0, 0.0], [0.33, 0.33, 0.33], 4], [[0.0, 1.0, 0.0], [0.33, 0.33, 0.33], 5], [[0.0, 0.0, 1.0], [0.33, 0.33, 0.33], 6], [[0.5, 0.5, 0.0], [0.5, 0.0, 0.5], 7], [[0.5, 0.5, 0.0], [0.0, 0.5, 0.5], 8], [[0.5, 0.0, 0.5], [0.0, 0.5, 0.5], 9], [[0.5, 0.25, 0.25], [0.33, 0.33, 0.33], 10], [[0.25, 0.5, 0.25], [0.33, 0.33, 0.33], 11], [[0.25, 0.25, 0.5], [0.33, 0.33, 0.33], 12]];

		for (let i = 0; i < all_decisions_values.length; i++) {
			let decisions = new Array();
			let decision_1 = new Decision(all_decisions_values[i][0][0], all_decisions_values[i][0][1], all_decisions_values[i][0][2], all_decisions_values[i][2]);
			let decision_2 = new Decision(all_decisions_values[i][1][0], all_decisions_values[i][1][1], all_decisions_values[i][1][2], all_decisions_values[i][2]);
			decisions.push(decision_1);
			decisions.push(decision_2);
			this.all_decisions.push(decisions);
		}
	}
}
