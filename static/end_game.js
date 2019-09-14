import ending_questions from "/static/ajax_requests/end_game.js"
import demographicsHtml from "/static/demographics.js"

export default function end_game(canvas, player, game_data, start) {
	var data = {
		"player": player,
		"playerType": game_data["playerType"],
		"numShareholderSelected": game_data["numShareholderSelected"],
		"sim": game_data["sim"],
		"numEmployeeSelected": game_data["numEmployeeSelected"],
		"numEnvironmentSelected": game_data["numEnvironmentSelected"],
		"worldType": game_data["worldType"],
		"run_id": game_data["run_id"]
	}

	let End = Swal.mixin({
		width: 900, 
		customClass: 'swal-height-2', 
	 	confirmButtonText: 'Submit',
	 	input: 'text',
	 	onBeforeOpen: (dom) => {
			End.getInput().style.display = 'none';
		},
	 	inputValidator: (value) => {
	  		if (document.getElementById('swal-input').value.length < 50) {
	    		return 'You need to write at least 50 characters!'
	    	}
	  	},
	  	preConfirm: () => {
	  		return document.getElementById('swal-input').value;
	  	},
	  	allowOutsideClick: false,
	  	allowEscapeKey: false,
	  	animation: false,
	  	progressSteps: ['1', '2', '3', '4', '5'],
	  	padding: '3rem'
	})

	if (game_data["sim"] === 'y') {
		Swal.fire({
			width: 720,
			customClass: 'swal-height',
			confirmButtonText: '<i class="arrow right icon"></i>',
			allowOutsideClick: false,
			allowEscapeKey: false,
			animation: false,
			html: '<h1 style="margin: auto auto 3vh auto">End of Part 1</h1>' + 
			'<div style="margin: auto 6vh 9.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">Thank you for your decisions.  Now we\'d like to ask you a few questions about your experience with this simulation.</div>'
		}).then(() =>
			End.queue([
			  {
			  	html: '<h1 style="margin: auto auto 3vh auto">Business Simulation Survey</h1>' +
				'<div style="margin: auto 6.5vh 3vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">1. Please describe how you made your decisions. What factors did you consider when choosing between the two possibilities? Please write at least 50 characters.<br><br>' +
				'<textarea id="swal-input" rows="15" cols="82"></textarea>' +
				'<br><div style="font-size: 15px;">(Note: You are unable to review your answers once you have submitted them)</div></div>'
			  },
			  {
			    html: '<div style="margin: auto 6.5vh 3vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">2. Did you notice your decisions having any impact on the simulation?  If so, what effects did your decisions have? Please write at least 50 characters.<br><br>' +
				'<textarea id="swal-input" rows="15" cols="82"></textarea>' +
				'<br><div style="font-size: 15px;">(Note: You are unable to review your answers once you have submitted them)</div></div>'
			  },
			  {
			  	html: '<div style="margin: auto 6.5vh 3vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">3. Did the simulation change how you thought about how to respond to the choices you needed to make as a director of a corporation?  Why or why not? Please write at least 50 characters.<br><br>' +
				'<textarea id="swal-input" rows="15" cols="82"></textarea>' +
				'<br><div style="font-size: 15px;">(Note: You are unable to review your answers once you have submitted them)</div></div>'
			  },
			  {
			  	html: '<div style="margin: auto 6.5vh 3vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">4. We would welcome any other thoughts you might have below. Please write at least 50 characters.<br><br>' +
				'<textarea id="swal-input" rows="15" cols="82"></textarea>' +
				'<br><div style="font-size: 15px;">(Note: You are unable to review your answers once you have submitted them)</div></div>'
			  },
			  {
			  	html: demographicsHtml,
				onBeforeOpen: (dom) => {
					End.getInput().style.display = 'none';
					$('.dropdown').dropdown();
				},
				inputValidator: (value) => {
					let id = $('.id').val();
					let country = $('.country').dropdown('get value');
					let age = $('.age').dropdown('get value');
					let gender = $('.gender').dropdown('get value');
					
					const regex = /^[0-9a-zA-Z]+$/
					if (!id.match(regex)) {
						return 'Please enter a valid MTurk ID.'
					} 
					if (country === "null") {
						return 'Please choose a country.'
					}
					if (age === "null") {
						return 'Please choose an age.'
					}
					if (gender === "null") {
						return 'Please select one of the choices for gender.  If you prefer not to disclose your gender, please select "Prefer not to disclose".'
					}
					else if (gender === "ptsd") {
						let description = $('.description').val();
						if (description.length === 0) {
							return 'Please describe your gender.'
						}
					}
				},
				preConfirm: () => {
					let id = $('.id').val();
					let country = $('.country').dropdown('get value');
					let age = $('.age').dropdown('get value');
					let gender = $('.gender').dropdown('get value');
					if (gender === "ptsd") {
						gender = $('.description').val();
						console.log(gender)
					}
					return [country, age, gender, id]
				}
			  }
			]).then(result => {
				let d = new Date();
				let hours = d.getHours();
				let minutes = d.getMinutes();
				let seconds = d.getSeconds();
				//let end = (3600 * hours) + (60 * minutes) + seconds;
				//let totalTime = end - start + 60; // total time in seconds (+ 60 to account for how long it takes them to read the first page)
				let end = new Date();
				let totalTime = (end - start)/1000;
				data["1"] = result.value[0];
				data["2"] = result.value[1];
				data["3"] = result.value[2];
				data["4"] = result.value[3];
				var temp = result.value[4];
				data["5"] = temp[0];
				data["6"] = temp[1];
				data["7"] = temp[2];
				data["8"] = temp[3];
				data["time_taken"] = totalTime
				ending_questions(data)
				Swal.fire({
					type: 'success',
					width: 720,
					customClass: 'swal-height-3',
					title: 'Thank you for participating in the Business Simulation!',
					text: 'Your User ID is: ' + player.toString() + '. Please copy this and paste it into the User ID field in the MTurk study.  Once you have done so, you may close this tab.',
					showConfirmButton: false,
					allowOutsideClick: false,
					allowEscapeKey: false,
					animation: false
				})
			})
		);
	}
	else {
		End = Swal.mixin({
			width: 900,
			customClass: 'swal-height-2',
		 	confirmButtonText: 'Submit',
		 	input: 'text',
		 	onBeforeOpen: (dom) => {
				End.getInput().style.display = 'none';
			},
		 	inputValidator: (value) => {
		  		if (document.getElementById('swal-input').value.length < 50) {
		    		return 'You need to write at least 50 characters!'
		    	}
		  	},
		  	preConfirm: () => {
		  		return document.getElementById('swal-input').value;
		  	},
		  	allowOutsideClick: false,
		  	allowEscapeKey: false,
		  	animation: false,
		  	progressSteps: ['1', '2', '3', '4'],
		  	padding: '3rem'
		})

		Swal.fire({
			width: 720,
			customClass: 'swal-height',
			confirmButtonText: '<i class="arrow right icon"></i>',
			allowOutsideClick: false,
			allowEscapeKey: false,
			animation: false,
			html: '<h1 style="margin: auto auto 3vh auto">End of Part 1</h1>' + 
			'<div style="margin: auto 6vh 9.5vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">Thank you for your decisions.  Now we\'d like to ask you a few questions about your experience with this simulation.</div>'
		}).then(() =>
			End.queue([
			  {
			  	html: '<h1 style="margin: auto auto 3vh auto">Business Simulation Survey</h1>' +
				'<div style="margin: auto 6.5vh 3vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">1. Please describe how you made your decisions. Please write at least 50 characters.<br><br>' +
				'<textarea id="swal-input" rows="15" cols="82"></textarea>' +
				'<br><div style="font-size: 15px;">(Note: You are unable to review your answers once you have submitted them)</div></div>'
			  },
			  {
			    html: '<div style="margin: auto 6.5vh 3vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">2. What factors did you consider when choosing between the two possibilities? Please write at least 50 characters.<br><br>' +
				'<textarea id="swal-input" rows="15" cols="82"></textarea>' +
				'<br><div style="font-size: 15px;">(Note: You are unable to review your answers once you have submitted them)</div></div>'
			  },
			  {
			  	html: '<div style="margin: auto 6.5vh 3vh 6vh; line-height: 1.5; font-size: 18px; text-align: left;">3. We would welcome any other thoughts you might have below. Please write at least 50 characters.<br><br>' +
				'<textarea id="swal-input" rows="15" cols="82"></textarea>' +
				'<br><div style="font-size: 15px;">(Note: You are unable to review your answers once you have submitted them)</div></div>'
			  },
			  {
			  	html: demographicsHtml,
				onBeforeOpen: (dom) => {
					End.getInput().style.display = 'none';
					$('.dropdown').dropdown();
				},
				inputValidator: (value) => {
					let id = $('.id').val();
					let country = $('.country').dropdown('get value');
					let age = $('.age').dropdown('get value');
					let gender = $('.gender').dropdown('get value');
					
					const regex = /^[0-9a-zA-Z]+$/
					if (!id.match(regex)) {
						return 'Please enter a valid MTurk ID.'
					} 
					if (country === "null") {
						return 'Please choose a country.'
					}
					if (age === "null") {
						return 'Please choose an age.'
					}
					if (gender === "null") {
						return 'Please select one of the choices for gender.  If you prefer not to disclose your gender, please select "Prefer not to disclose".'
					}
					else if (gender === "ptsd") {
						let description = $('.description').val();
						if (description.length === 0) {
							return 'Please describe your gender.'
						}
					}
				},
				preConfirm: () => {
					let id = $('.id').val();
					let country = $('.country').dropdown('get value');
					let age = $('.age').dropdown('get value');
					let gender = $('.gender').dropdown('get value');
					if (gender === "ptsd") {
						gender = $('.description').val();
						console.log(gender)
					}
					return [country, age, gender, id]
				}
			  }
			]).then(result => {
				let end = new Date();
				let totalTime = (end - start)/1000;
				data["1"] = result.value[0];
				data["2"] = result.value[1];
				data["3"] = result.value[2];
				data["4"] = "N/A";
				var temp = result.value[3]
				data["5"] = temp[0];
				data["6"] = temp[1];
				data["7"] = temp[2];
				data["8"] = temp[3];
				data["time_taken"] = totalTime
				ending_questions(data)
				Swal.fire({
					type: 'success',
					width: 720,
					customClass: 'swal-height-3',
					title: 'Thank you for participating in the Business Simulation!',
					text: 'Your User ID is: ' + player.toString() + '. Please copy this and paste it into the User ID field in the MTurk study.  Once you have done so, you may close this tab.',
					showConfirmButton: false,
					allowOutsideClick: false,
					allowEscapeKey: false,
					animation: false
				})
			})
		);
	}
}