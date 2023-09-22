# Import flask and datetime module for showing date and time
from flask import Flask,request,jsonify,session
import datetime
from flask_pymongo import PyMongo
import json
from bson.objectid import ObjectId
import bson.json_util as json_util
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import string
import random
from decouple import config 
x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = config('mongo_url')

mongo = PyMongo(app)
# Route for seeing a data
@app.route('/data')
def get_time():
	user=mongo.db.users.find()
	print(user[0]['name'])
	# Returning an api for showing in reactjs
	return {
		'Name':"geek",
		"Age":"22",
		"Date":x,
		"programming":"python"
		}

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
