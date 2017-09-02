from flask import Flask, jsonify, request
from json import dumps

app = Flask(__name__)

user={}

@app.route('/')
def hello_world():
    return 'FoodSQL'

@app.route('/user/new', methods=['POST'])
def register():
    request_json = request.get_json();
    print(request_json['name'])
    user['email'] = request_json['email']
    user['name'] = request_json['name']
    user['password'] = request_json['password']
    print(user)
    return dumps(user)

@app.route('/user/login', methods=['GET', 'POST'])
def login():
    request_json = request.get_json();
    print(user)
    if user['email'] == request_json['email']:
        if user['password'] == request_json['password']:
            user['status'] = 200
            return dumps(user)
    print("FAILED TO LOGIN")
    return jsonify(status=201,content_type = "application/json")
