# Import flask and datetime module for showing date and time
from flask import Flask,request,jsonify,session,send_from_directory
import datetime
from flask_pymongo import PyMongo
import json
from bson.objectid import ObjectId
import bson.json_util as json_util
from werkzeug.utils import secure_filename
from flask_cors import CORS,cross_origin
import os
import string
import random
import json
from decouple import config 
x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__,static_url_path="/")#, static_folder="../frontend/build" )
CORS(app)
app.config["MONGO_URI"] = config('mongo_url')

mongo = PyMongo(app)

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# @cross_origin()
# def serve(path):
#     if path != "" and os.path.exists("static/" + path):
#         return send_from_directory("static", path)
#     else:
#         return send_from_directory("static", "index.html")

# Route for seeing a data
@app.route('/api/fetchuser',methods=["POST"])
def getuser():
    if request.method=="POST":
            if request.is_json:
                data=request.json
                email=data["email"]
                if email:
                    user=mongo.db.users.find_one({"email":email})
                    if user:
                        return json.loads(json_util.dumps({"response":{"user":user,"status":True}}))
                    else:
                        return json.loads(json_util.dumps({"response":{"message":"The user is not foound","status":False}}))
                else:
                    return json.loads(json_util.dumps({"response":{"message":"The user is not found","status":False}}))	

@app.route('/api/signup',methods=["POST"])
def send_user():
    if request.method=="POST":
        if(request.is_json):
            user=request.json
            email=user['email']
            isEmailExist=mongo.db.users.find_one({'email':email})
            if(isEmailExist):
                return{
                    "status":False,
                    "code":400,
                    "message":"The email is already taken:((("
                }
            else:
                newUser=mongo.db.users.insert_one(user)
                return {
                    "status":True,
                    "code":200,
                    "message":"Successfully Added! :))"
                }
        
@app.route('/api/test',methods=["get"])
def test():
    return{
        "messege":"ok"
    }
@app.route('/api/login',methods=["POST"])
def login():
    if request.method=="POST":
        if request.is_json:
            user=request.json
            email=user['email']
            password=user['password'] 
            if email and password:
                foundUser=mongo.db.users.find_one({"email":email})
                if foundUser :
                    if foundUser['password']==password:
                        return json.loads(json_util.dumps({"response":{
                            "code":200,
                            "status":True,
                            "user":foundUser,
                            "message":"Successfully login :)))"
                        }}))	
                    else:
                        return json.loads(json_util.dumps({"response":{
                            "code":400,
                            "status":False,
                            "message":"email or/and Password are wrong :(("
                        }}))
                else:
                    return json.loads(json_util.dumps({"response":{
                            "code":400,
                            "status":False,
                            "message":"email or/and Password are wrong :(("
                        }}))
@app.route('/api/addeducation', methods=['POST'])
def post_education():
    if request.method == "POST":
        if request.is_json:
            data = request.json
            user_id = data.get('id')
            education = {
                "_id":ObjectId(),
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
            education['_id'] = str(education['_id'])
            if user:
                return {
                    "status": True,
                    "_id":education['_id'],
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
@app.route('/api/addwork', methods=['POST'])
def post_work():
    if request.method == "POST":
        if request.is_json:
            data = request.json
            user_id = data.get('id')
            work = {
                "_id":ObjectId(),
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
            work['_id'] = str(work['_id'])
            if user:
                return {
                    "status": True,
                    "_id":work["_id"],
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
@app.route('/api/editwork', methods=['PUT'])
def edit_work():
    if request.method == "PUT":
        if request.is_json:
            data = request.json
            user_id = data.get('id')
            work_id = data.get('_id')

            work = {
                "position": data['position'],
                "company": data['company'],
                "start": data['start'],
                "end": data['end'],
                "duties": data['duties']
            }

            user = mongo.db.users.find_one_and_update(
                {"_id": ObjectId(str(user_id)),  "works._id": ObjectId(str(work_id))},
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
   
@app.route('/api/editeducation', methods=['PUT'])
def edit_education():
    if request.method == "PUT":
        if request.is_json:
            data = request.json
            user_id = data.get('id')
            education_id = data.get('_id')

            education = {
                "school": data['school'],
                "degree": data['degree'],
                "major": data['major'],
                "start": data['start'],
                "finish": data['finish']
            }

            user = mongo.db.users.find_one_and_update(
                {"_id": ObjectId(str(user_id)),  "educations._id": ObjectId(str(education_id))},
                {"$set": {"educations.$.school": education['school'],
                          "educations.$.degree": education['degree'],
                          "educations.$.major": education['major'],
                          "educations.$.start": education['start'],
                          "educations.$.finish": education['finish']}}
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
@app.route('/api/editlanguage', methods=['PUT'])
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
                "finalmark": data['finalmark']
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
	app.run(debug=False)
