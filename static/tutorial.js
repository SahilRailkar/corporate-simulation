const Tutorial = Swal.mixin({
	width: 720,
	confirmButtonColor: '#3085d6',
	confirmButtonText: '<i class="arrow right icon"></i>',
	customClass: 'swal-height',
	allowOutsideClick: false,
	animation: false
});

export function presentDecisionsSlide(res, world, game_data) {
	if (!('dismiss' in res)) {
		let text = {
			"ssd": "shareholders",
			"emsd": "employees",
			"ensd": "environmental consultants"
		}
		Tutorial.fire({
			html: '<h1 style="margin: auto auto 4vh auto">Decisions</h1>' +
			'<div style="margin: auto 6vh 11vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">You will now be asked to make 12 decisions. Please do your best to behave as you would if you were a real director of a corporation who had been selected by ' + text[game_data["playerType"]] + '.</div>',
			confirmButtonText: 'Begin!'
		}).then(() => {
			window.is_running = true;
			for (let i = 0; i < world.state.firms.length; i++) {
				world.state.firms[i].drawn = true;
			}
		})
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentPollutionSlide(res, world, game_data) {
	let individuals = world.state.individuals;
	for (let i = 0; i < individuals.length; i++){
		window.setTimeout(() => individuals[i].draw(), i*5)
	}
	if (!('dismiss' in res)) {
		window.setTimeout(() => Tutorial.fire({
			html: '<h1 style="margin: auto auto 4vh auto">Pollution</h1>' +
			'<div style="margin: auto 6vh 13.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">The color of the ground shows how much pollution there is at a given location. Green is unpolluted and brown is polluted.</div>'
		}).then(result => presentDecisionsSlide(result, world, game_data)), 2075)
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentPeopleSlide(res, world, game_data) {
	let houses = world.state.houses;
	for (let i = 0; i < houses.length; i++){
		window.setTimeout(() => houses[i].draw(), i*10);
	}
	if (!('dismiss' in res)) {
		window.setTimeout(() => Tutorial.fire({
			html: '<h1 style="margin: auto auto 3vh auto">People</h1>' + 
			'<div style="margin: auto 6vh 3vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">Additionally, there are ' + world.state.individuals.length.toString() + ' people that inhabit these houses. ' + 
			'The people go to work at the corporations, and then go home each night. ' +
			"The people are green when they're happy, and red when they're not. " +
			"The happiness of each person is affected by how much money they make. </div>",
			imageUrl: '/static/happy.png',
			imageAlt: 'Custom image'
		}).then(result => presentPollutionSlide(result, world, game_data)), 3250);
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentHousesSlide(res, world, game_data) {
	let firms = world.state.firms;
	for (let i = 0; i < firms.length; i++){
		window.setTimeout(() => firms[i].state.sharePrice.draw(), i*200);
	}
	if (!('dismiss' in res)) {
		window.setTimeout(() => Tutorial.fire({
			html: '<div style="margin: auto auto 13.5vh auto"><h1 style="margin: auto auto 3vh auto;">Houses</h1>' + 
			'<div style="margin: auto 6vh 16vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">There are ' + world.state.houses.length.toString() + ' houses in the world.</div></div>',
			imageUrl: '/static/house.png',
			imageAlt: 'Custom image'
		}).then(result => presentPeopleSlide(result, world, game_data)), 1375);
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentSharePriceSlide(res, world, game_data) {
	let firms = world.state.firms;
	for (let i = 1; i < firms.length; i++){
		window.setTimeout(() => {firms[i].draw()}, i*200);
	}
	if (!('dismiss' in res)) {
		window.setTimeout(() => Tutorial.fire({
			html:'<h1 style="margin: auto auto 3vh auto">Share Price</h1>' +
			'<div style="margin: auto 6vh 10.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">'+
			'The current share price of each corporation is 100.</div>',
			imageUrl: '/static/firm-2.png',
			imageAlt: 'Custom image'
		}).then(result => presentHousesSlide(result, world, game_data)), 1375);
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentOtherFirmsSlide(res, world, game_data) {
	if (!('dismiss' in res)) {
		Tutorial.fire({
			html:'<h1 style="margin: auto auto 3vh auto">Other Corporations</h1>' +
				'<div style="margin: auto 6vh 10.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">'+
				'In addition to your corporation, there are 4 other corporations that will be operating independently. The behavior of the other corporations is out of your control. </div>',
			imageUrl: '/static/firm-2.png',
			imageAlt: 'Custom image'
		}).then(result => presentSharePriceSlide(result, world, game_data))
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentBoardOfDirectorsSlide(res, world, game_data) {
	if (!('dismiss' in res)) {
		Tutorial.fire({
			html: '<h1 style="margin: auto auto 3vh auto">Board of Directors</h1>' +
			'<div style="margin: auto 6vh 15vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">There may be other directors on the board of directors as well, potentially representing other stakeholders.' +
			'</div>',
			animation: false
		}).then(result => presentOtherFirmsSlide(result, world, game_data))
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
 }
}

export function presentLawSlide(res, world, game_data) {
	let law = ""
	if (game_data["worldType"] == "a") {
		law = '"Directors shall manage the corporation in a way that balances the financial interests of its shareholders with the best interests of persons that are materially affected by the conduct of the corporation. In doing so, directors shall consider the effects of any action or inaction on the shareholders of the corporation; the employees of the corporation; and the environment. Directors shall not be required to give priority to a particular interest or factor [for example, shareholders, employees, or the environment] over any other interest or factor."'
	}
	else {
		law = '"Directors owe a fiduciary duty of loyalty and duty of care to the corporation and its shareholders. Directors must act in good faith to advance the best interests of the corporation. The corporation may undertake any lawful business by any lawful means. Directors must exercise good-faith efforts to ensure that the corporation complies with laws applicable to its operations (such as environmental, labor, and criminal laws). Directors are prohibited from using their positions to advance their own personal interests."'
	}

	if (!('dismiss' in res)) {
		Tutorial.fire({
			html: '<h1 style="margin: auto auto 3.5vh auto">Law</h1>' +
			'<div style="margin: auto 6vh 1vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">The applicable law is as follows: ' + law + ' </div>'
		}).then(result => {
			if (game_data["sim"] === 'y') {
				if (game_data["worldType"] === 'a') {
					presentBoardOfDirectorsSlide(result, world, game_data);
				}
				else {
					presentOtherFirmsSlide(result, world, game_data);
				}
			}
			else {
				presentDecisionsSlide(result, world, game_data)
			}
		})
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentSelectedDirectorSlide(res, world, game_data) {
	if (!('dismiss' in res)) {
		let text;
		if (game_data["sim"] === 'y') {
			text = {
				"ssd": "<h1 style=\"margin: auto auto 4vh auto\">Shareholder-Selected Director</h1><div style=\"margin: auto 6vh 17vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;\">You became a director via a public vote of the corporation's shareholders.</div>",
				"emsd": "<h1 style=\"margin: auto auto 4vh auto\">Employee-Selected Director</h1><div style=\"margin: auto 6vh 17vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;\">You became a director via a public vote of the corporation's employees.</div>",
				"ensd": "<h1 style=\"margin: auto auto 4vh auto\">Environment-Selected Director</h1><div style=\"margin: auto 6vh 17vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;\">You became a director in order to encourage environment-oriented decisions.</div>"
			}
		}
		else {
			text = {
				"ssd": "<h1 style=\"margin: auto auto 4vh auto\">Shareholder-Selected Director</h1><div style=\"margin: auto 6vh 13.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;\">You became a director via a public vote of the corporation's shareholders. There may be other directors on the board of directors as well, potentially representing other stakeholders.</div>",
				"emsd": "<h1 style=\"margin: auto auto 4vh auto\">Employee-Selected Director</h1><div style=\"margin: auto 6vh 13.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;\">You became a director via a public vote of the corporation's employees. There may be other directors on the board of directors as well, potentially representing other stakeholders.</div>",
				"ensd": "<h1 style=\"margin: auto auto 4vh auto\">Environment-Selected Director</h1><div style=\"margin: auto 6vh 13.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;\">You became a director in order to encourage environment-oriented decisions. There may be other directors on the board of directors as well, potentially representing other stakeholders.</div>"
			}
		}
		Tutorial.fire({
			html: text[game_data["playerType"]]												
		}).then(result => {
			presentLawSlide(result, world, game_data);
		})
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentDirectorSlide(res, world, game_data) {
	if (game_data["sim"] === 'y') {
		let firms = world.state.firms;
		window.setTimeout(() => firms[0].draw(), 200);
	}
	if (!('dismiss' in res)) {
		if (game_data["sim"] === 'y') {
			window.setTimeout(() => Tutorial.fire({
				html: '<h1 style="margin: auto auto 4vh auto">Director</h1>' +
				'<div style="margin: auto 6vh 13.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">As a director, you are tasked with making decisions that will impact shareholders, employees, and the environment.</div>'
			}).then(result => presentSelectedDirectorSlide(result, world, game_data)), 975);
		}
		else {
			Tutorial.fire({
				html: '<h1 style="margin: auto auto 4vh auto">Director</h1>' +
				'<div style="margin: auto 6vh 13.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">You are one of the directors in a corporation. As a director, you are tasked with making decisions that will impact shareholders, employees, and the environment.</div>'
			}).then(result => presentSelectedDirectorSlide(result, world, game_data))
		}
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentYourFirmSlide(res, world, game_data) {
	if (!('dismiss' in res)) {
		Tutorial.fire({
			html:'<h1 style="margin: auto auto 3vh auto">Corporations</h1>' +
				'<div style="margin: auto 6vh 10.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">You are one of the directors in a corporation (located in the center of the simulation). ' +
				'</div>',
			imageUrl: '/static/firm-2.png',
			imageAlt: 'Custom image'
		}).then(result => presentDirectorSlide(result, world, game_data));
	}
	else {
		window.is_running = true;
		for (let i = 0; i < world.state.firms.length; i++) {
			world.state.firms[i].drawn = true;
		}
	}
}

export function presentTutorial(world, game_data) {
	if (game_data["sim"] === 'y') {
		Tutorial.fire({
			html: '<h1 style="margin: auto auto 3vh auto"> Welcome to the Board of Directors Simulation.</h1>' + 
			'<div style="margin: auto 6vh 3vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">The purpose of this study is to explore the effects of different laws on the behavior of the directors of corporations. ' +
			'In the study, you will interact with a simplified business simulation. ' +  
			'The simulation will begin once you have gone through the entire tutorial.</div> ',
		}).then(result => presentYourFirmSlide(result, world, game_data))
	}
	else {
		Tutorial.fire({
			html: '<h1 style="margin: auto auto 3vh auto"> Welcome to the Board of Directors Simulation.</h1>' + 
			'<div style="margin: auto 6vh 9vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">The purpose of this study is to explore the effects of different laws on the behavior of the directors of corporations.</div>'
		}).then(result => presentDirectorSlide(result, world, game_data))
	}
}
