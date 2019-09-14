export default class Decision {
	constructor(sharePrice, employeeWage, environmentalImpact, num_decision) {
		this.impacts = {
			sharePrice: sharePrice,
			employeeWage: employeeWage,
			environmentalImpact: environmentalImpact
		};
		this.num_decision = num_decision;
		this.largest_impact = ""
		let keys = Object.keys(this.impacts)
		for (let i = 0; i < keys.length; i++) {
			if (this.largest_impact == "") {
				this.largest_impact = keys[i];
			}
			else {
				let largest_impact = this.largest_impact;
				let impact = keys[i]
				if (this.impacts[impact] > this.impacts[largest_impact]) {
					this.largest_impact = keys[i];
				}
			}
		}
	}
}
