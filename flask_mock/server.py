from flask import Flask, jsonify, request
from json import dumps

app = Flask(__name__)

user={'email':'molines@gmail.com',
      'name' :'Rafael Molines',
      'id'   :'0',
      'status':200
    }

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
    return dumps(user)
