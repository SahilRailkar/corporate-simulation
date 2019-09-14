import os

from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

from flask_sqlalchemy import SQLAlchemy

import datetime
import json

app = Flask(__name__)
project_dir = os.path.dirname(os.path.abspath(__file__))

app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://sxxchhqloblgay:c27d0cfc1d52a14390a00e429d1d9e2073ed4a4a9b3fb02866723bd67ac4255b@ec2-50-19-124-157.compute-1.amazonaws.com:5432/d322qhitgd9v53"
db = SQLAlchemy(app)

class Poll(db.Model):
	__tablename__ = 'DECISIONS'
	player=db.Column(db.Float, unique=False, nullable=False, primary_key=False)
	playerType=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	numShareholderSelected=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	numEmployeeSelected=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	numEnvironmentSelected=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	worldType=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	sim=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	run_id=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	decision_number=db.Column(db.Integer, unique=False, nullable=False, primary_key=False)
	choice=db.Column(db.String(10), unique=False, nullable=False, primary_key=False)
	rotation=db.Column(db.String(10), unique=False, nullable=False, primary_key=False)
	time=db.Column(db.String(100), unique=True, nullable=False, primary_key=True)

	def __repr__(self):
		return str(self.__dict__)

class EndQuestions(db.Model):
	__tablename__ = 'ENDGAME'
	player=db.Column(db.Float, unique=False, nullable=False, primary_key=True)
	run_id=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	playerType=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	numShareholderSelected=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	numEmployeeSelected=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	numEnvironmentSelected=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	worldType=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	sim=db.Column(db.String(100), unique=False, nullable=False, primary_key=False)
	q1=db.Column(db.String(1500), unique=False, nullable=False, primary_key=False)
	q2=db.Column(db.String(1500), unique=False, nullable=False, primary_key=False)
	q3=db.Column(db.String(1500), unique=False, nullable=False, primary_key=False)
	q4=db.Column(db.String(1500), unique=False, nullable=False, primary_key=False)
	q5=db.Column(db.String(1500), unique=False, nullable=False, primary_key=False)
	q6=db.Column(db.String(1500), unique=False, nullable=False, primary_key=False)
	q7=db.Column(db.String(1500), unique=False, nullable=False, primary_key=False)
	q8=db.Column(db.String(1500), unique=False, nullable=False, primary_key=False)
	time_taken=db.Column(db.Integer, unique=False, nullable=False, primary_key=False)

	def __repr__(self):
		return str(self.__dict__)

db.create_all()

@app.route("/add_endgame_report", methods=["POST"])
def add_endgame_report():
	d = request.get_json()
	my_data = EndQuestions(
			player=d["player"],
			playerType=d["playerType"],
			sim=d["sim"],
			run_id=d["run_id"],
			numShareholderSelected=d["numShareholderSelected"],
			numEmployeeSelected=d["numEmployeeSelected"],
			numEnvironmentSelected=d["numEnvironmentSelected"],
			worldType=d["worldType"],
			time_taken=d["time_taken"],
			q1=d["1"],
			q2=d["2"],
			q3=d["3"],
			q4=d["4"],
			q5=d["5"],
			q6=d["6"],
			q7=d["7"],
			q8=d["8"]
		)
	db.session.add(my_data)
	db.session.commit()
	data = {
		"playerType": my_data.playerType
	}
	return render_template("index.html", data=data)

@app.route("/add_decision", methods=["POST"])
def add_decision():
	d = request.get_json()
	choice_made = "A"
	val = d["decision"]
	rotation = d["rotation"]
	if rotation == "reversed":
		if val == 1:
			choice_made = "B"
	elif val == 2:
		choice_made = "B"
	p = Poll(
			player=d["player"],
			playerType=d["playerType"],
			numShareholderSelected=d["numShareholderSelected"],
			sim=d["sim"],
			numEmployeeSelected=d["numEmployeeSelected"],
			numEnvironmentSelected=d["numEnvironmentSelected"],
			worldType=d["worldType"],
			rotation=d["rotation"],
			decision_number=d["num_decision"],
			run_id=d["run_id"],
			choice=choice_made,
			time=str(datetime.datetime.now()).rstrip("\n")
		)
	data = {
		"playerType": p.playerType
	}
	db.session.add(p)
	db.session.commit()
	return render_template("index.html", data=data)

@app.route("/", methods=["GET", "POST"])
def start():
	data = {
		'ssd': request.args.get('ssd', default = 6, type = int),
		'emsd': request.args.get('emsd', default = 4, type = int),
		'ensd': request.args.get('ensd', default = 0, type = int),
		'u': request.args.get('u', default = "emsd", type = str),
		'w': request.args.get('w', default = "d", type = str),
		'sim': request.args.get('sim', default = "y", type = str),
		'run_id': request.args.get('run_id', default = "test", type = str)
	}
	return render_template("index.html", data=data)


if __name__ == "__main__":
	app.run(debug=True)