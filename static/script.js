import Individual from "/static/individual.js";
import Grid from "/static/grid.js";
import Location from "/static/location.js";
import Firm from "/static/firm.js";
import House from "/static/house.js";
import World from "/static/world.js";
import Instantiate from "/static/instantiate.js";
import update_world from "/static/update_world.js";
import Vector from "/static/Vector.js";
import end_game from "/static/end_game.js"
import {canvas, grid, world, instantiate, firm_1, firm_2, firm_3, firm_4, firm_5} from "/static/constants.js";
import * as tutorial from "/static/tutorial.js";

window.is_running = true;
window.onload = () => {
	let game_data = {
		"playerType": document.getElementById("u").innerHTML, //str
		"numShareholderSelected": Number(document.getElementById("ssd").innerHTML), //int
		"numEmployeeSelected": Number(document.getElementById("emsd").innerHTML), //int
		"numEnvironmentSelected": Number(document.getElementById("ensd").innerHTML), //int
		"worldType": document.getElementById("w").innerHTML, //str
		"sim": document.getElementById("sim").innerHTML, //str
		"run_id": document.getElementById("run_id").innerHTML //str
	}

	let firms = [firm_1, firm_2, firm_3, firm_4, firm_5];
	world.state.firms = firms;

	let houses = instantiate.instantiate_houses(grid, canvas, world, firms)
	world.state.houses = houses;
	let availableHouses = houses.slice();

	let individuals = instantiate.instantiate_individuals(availableHouses, canvas, grid, world, firms)
	world.state.individuals = individuals;

	if (game_data["sim"] === 'y') {
		grid.draw();
		document.body.style.backgroundColor = 'rgb(' + 50 + ',' + 205 + ',' + 50 + ')';
	}
	else {
		document.body.style.backgroundColor = "black";
	}

	world.generateDecisions(game_data["playerType"]);

	window.is_running = false;

	let start = new Date();

	tutorial.presentTutorial(world, game_data);

	let time = 0
	let player_number = Math.random() * 1000000
	let num_decisions = 0;
	setInterval(() => {
		if (window.is_running) {
			if (num_decisions < 12) {
				num_decisions += update_world(canvas, grid, world, firms, houses, availableHouses, individuals, time, player_number, game_data, num_decisions);
				time+=10;
			} else {
				end_game(canvas, player_number, game_data, start)
				window.is_running = false;
			}
		}
		
	}, 10);
};
