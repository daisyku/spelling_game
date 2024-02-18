# Filename - server.py

# Import flask and datetime module for showing date and time
from flask import Flask, jsonify
import datetime
from spellingbeegame import generate_pangrams, getScore

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

#Route for seeing a data
# @app.route('/data')
# def get_time():

# 	# Returning an api for showing in reactjs
# 	return {
# 		'Name':"geek", 
# 		"Age":"22",
# 		"Date":x, 
# 		"programming":"python"
# 		}

@app.route('/game_state')
def game_state():
    lst, letters, special_letter, correct_inputs = generate_pangrams()
    return jsonify({
        'lst': lst,
        'letters': letters,
        'special_letter': special_letter,
        'correct_inputs': correct_inputs
    })
@app.route('/score')
def score(word):
	points = getScore(word)
	return jsonify({
		'score': points
    })
	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
