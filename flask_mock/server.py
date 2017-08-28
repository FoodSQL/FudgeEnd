from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'FoodSQL'

@app.route('/user/new', methods=['POST'])
def register():
    print("HELLO")
    json = request.get_json();
    print(json['body']['name'])
    return jsonify(status=200)

@app.route('/user/login_user', methods=['GET', 'POST'])
def login():
    print("TEST")
    json = request.get_json();
    print(json['body']['email'])
    return jsonify(status=200)
