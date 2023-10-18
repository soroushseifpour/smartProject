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
@app.route('/fetchuser')
def getuser():
	user=mongo.db.users.find()
	# Returning an api for showing in reactjs
	return json.loads(json_util.dumps({"response":{"user":user[0]}}))
@app.route('/addeducation', methods=['POST'])
def post_education():
    if request.method == "POST":
        if request.is_json:
            data = request.json
            user_id = data.get('id')
            education = {
                "school": data['school'],
                "degree": data['degree'],
                "major": data['major'],
                "start": data['start'],
                "finish": data['finish']
            }
            user = mongo.db.users.find_one_and_update(
                {"_id": ObjectId(str(user_id))},
                {"$push": {"educations": education}}
            )
            if user:
                return {
                    "status": True,
                    "code": 200,
                    "message": "Education added successfully."
                }
            else:
                return {
                    "status": False,
                    "code": 404,
                    "message": "User not found."
                }
        else:
            return {
                "status": False,
                "code": 400,
                "message": "Invalid JSON data."
            }
    else:
        return {
            "status": False,
            "code": 405,
            "message": "Method not allowed."
        }
@app.route('/addwork', methods=['POST'])
def post_work():
    if request.method == "POST":
        if request.is_json:
            data = request.json
            user_id = data.get('id')
            work = {
                "position": data['position'],
                "company": data['company'],
                "start": data['start'],
                "end": data['end'],
                "duties": data['duties']
            }
            user = mongo.db.users.find_one_and_update(
                {"_id": ObjectId(str(user_id))},
                {"$push": {"works": work}}
            )
            if user:
                return {
                    "status": True,
                    "code": 200,
                    "message": "work added successfully."
                }
            else:
                return {
                    "status": False,
                    "code": 404,
                    "message": "User not found."
                }
        else:
            return {
                "status": False,
                "code": 400,
                "message": "Invalid JSON data."
            }
    else:
        return {
            "status": False,
            "code": 405,
            "message": "Method not allowed."
        }
@app.route('/editwork', methods=['PUT'])
def edit_work():
    if request.method == "PUT":
        if request.is_json:
            data = request.json
            user_id = data.get('id')
            work_id = data.get('work_id')

            work = {
                "position": data['position'],
                "company": data['company'],
                "start": data['start'],
                "end": data['end'],
                "duties": data['duties']
            }

            user = mongo.db.users.find_one_and_update(
                {"_id": ObjectId(str(user_id)),  "works.id": ObjectId(str(work_id))},
                {"$set": {"works.$.position": work['position'],
                          "works.$.company": work['company'],
                          "works.$.start": work['start'],
                          "works.$.end": work['end'],
                          "works.$.duties": work['duties']}}
            )

            if user:
                return {
                    "status": True,
                    "code": 200,
                    "message": "Work updated successfully."
                }
            else:
                return {
                    "status": False,
                    "code": 404,
                    "message": "User or work not found."
                }
        else:
            return {
                "status": False,
                "code": 400,
                "message": "Invalid JSON data."
            }
    else:
        return {
            "status": False,
            "code": 405,
            "message": "Method not allowed."
        }
@app.route('/editeducation', methods=['PUT'])
def edit_education():
    if request.method == "PUT":
        if request.is_json:
            data = request.json
            user_id = data.get('id')
            education_id = data.get('education_id')

            education = {
                "school": data['school'],
                "degree": data['degree'],
                "major": data['major'],
                "start": data['start'],
                "finish": data['finish']
            }

            user = mongo.db.users.find_one_and_update(
                {"_id": ObjectId(str(user_id)),  "educations.id": ObjectId(str(education_id))},
                {"$set": {"educations.$.school": education['school'],
                          "educations.$.degree": education['degree'],
                          "educations.$.major": education['start'],
                          "educations.$.start": education['end'],
                          "educations.$.finish": education['duties']}}
            )

            if user:
                return {
                    "status": True,
                    "code": 200,
                    "message": "education updated successfully."
                }
            else:
                return {
                    "status": False,
                    "code": 404,
                    "message": "User or education not found."
                }
        else:
            return {
                "status": False,
                "code": 400,
                "message": "Invalid JSON data."
            }
    else:
        return {
            "status": False,
            "code": 405,
            "message": "Method not allowed."
        }
@app.route('/editlanguage', methods=['PUT'])
def edit_language():
    if request.method == "PUT":
        if request.is_json:
            data = request.json
            user_id = data.get('id')

            language = {
                "reading": data['reading'],
                "listening": data['listening'],
                "writing": data['writing'],
                "speaking": data['speaking'],
                "finalmark": data['finalMark']
            }
            # Define the filter to find the user by _id
            filter = {"_id": ObjectId(str(user_id))}

            # Define the update operation using the $set operator
            update = {
                "$set": {
                    "language": language
                }
            }

            # Update the user document in one query
            user = mongo.db.users.update_one(filter, update)

            if user:
                return {
                    "status": True,
                    "code": 200,
                    "message": "language updated successfully."
                }
            else:
                return {
                    "status": False,
                    "code": 404,
                    "message": "User or language not found."
                }
        else:
            return {
                "status": False,
                "code": 400,
                "message": "Invalid JSON data."
            }
    else:
        return {
            "status": False,
            "code": 405,
            "message": "Method not allowed."
        }

# Running app
if __name__ == '__main__':
	app.run(debug=True)
