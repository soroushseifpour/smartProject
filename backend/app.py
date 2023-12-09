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
@app.route('/api/addlanguage', methods=['POST'])
def post_language():
    if request.method == "POST":
        if request.is_json:
            data = request.json
            print(data)
            user_id = data.get('id')
            language = {
                "_id":ObjectId(),
                "title":data['title'],
                "reading": data['reading'],
                "listening": data['listening'],
                "writing": data['writing'],
                "speaking": data['speaking'],
                "finalmark": data['finalmark']
            }
            print(user_id)
            user = mongo.db.users.find_one_and_update(
                {"_id": ObjectId(str(user_id))},
                {"$push": {"languages": language}}
            )
            language['_id'] = str(language['_id'])
            if user:
                return {
                    "status": True,
                    "_id":language["_id"],
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
            language_id = data.get('_id')
            language = {
                "title":data['title'],
                "reading": data['reading'],
                "listening": data['listening'],
                "writing": data['writing'],
                "speaking": data['speaking'],
                "finalmark": data['finalmark']
            }
            user = mongo.db.users.find_one_and_update(
                {"_id": ObjectId(str(user_id)),  "languages._id": ObjectId(str(language_id))},
                {"$set": {"languages.$.reading": language['reading'],
                          "languages.$.listening": language['listening'],
                          "languages.$.writing": language['writing'],
                          "languages.$.title": language['title'],
                          "languages.$.finalmark": language['finalmark']}}
            )

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
@app.route('/api/users/<user_id>/languages/<item_id>', methods=['DELETE'])
def delete_item(user_id, item_id):
    if request.method=="DELETE":
        users_collection = mongo.db.users

        # Convert user_id and item_id to ObjectId for querying MongoDB
        user_id_obj = ObjectId(user_id)
        item_id_obj = ObjectId(item_id)

        user = users_collection.find_one({'_id': user_id_obj})
        if user:
            # Check if the item exists in the user's items array
            items = user.get('languages', [])
            updated_items = [item for item in items if item['_id'] != item_id_obj]

            # Update the user's items array in MongoDB
            result = users_collection.update_one(
                {'_id': user_id_obj},
                {'$set': {'languages': updated_items}}
            )

            if result.modified_count > 0:
                return jsonify({"message": f"language {item_id_obj} deleted for user {user_id}"})
            else:
                return jsonify({"error": "language ID not found in user's languages"}), 404
        else:
            return jsonify({"error": "User ID not found"}), 404
@app.route('/api/users/<user_id>/educations/<item_id>', methods=['DELETE'])
def delete_item(user_id, item_id):
    if request.method=="DELETE":
        users_collection = mongo.db.users

        # Convert user_id and item_id to ObjectId for querying MongoDB
        user_id_obj = ObjectId(user_id)
        item_id_obj = ObjectId(item_id)

        user = users_collection.find_one({'_id': user_id_obj})
        if user:
            # Check if the item exists in the user's items array
            items = user.get('educations', [])
            updated_items = [item for item in items if item['_id'] != item_id_obj]

            # Update the user's items array in MongoDB
            result = users_collection.update_one(
                {'_id': user_id_obj},
                {'$set': {'educations': updated_items}}
            )

            if result.modified_count > 0:
                return jsonify({"message": f"education {item_id_obj} deleted for user {user_id}"})
            else:
                return jsonify({"error": "language ID not found in user's educations"}), 404
        else:
            return jsonify({"error": "User ID not found"}), 404
@app.route('/api/users/<user_id>/works/<item_id>', methods=['DELETE'])
def delete_item(user_id, item_id):
    if request.method=="DELETE":
        users_collection = mongo.db.users

        # Convert user_id and item_id to ObjectId for querying MongoDB
        user_id_obj = ObjectId(user_id)
        item_id_obj = ObjectId(item_id)

        user = users_collection.find_one({'_id': user_id_obj})
        if user:
            # Check if the item exists in the user's items array
            items = user.get('works', [])
            updated_items = [item for item in items if item['_id'] != item_id_obj]

            # Update the user's items array in MongoDB
            result = users_collection.update_one(
                {'_id': user_id_obj},
                {'$set': {'works': updated_items}}
            )

            if result.modified_count > 0:
                return jsonify({"message": f"work {item_id_obj} deleted for user {user_id}"})
            else:
                return jsonify({"error": "language ID not found in user's works"}), 404
        else:
            return jsonify({"error": "User ID not found"}), 404

# Running app
if __name__ == '__main__':
	app.run(debug=False)
