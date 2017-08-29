from flask import Flask, jsonify, request

app = Flask(__name__)

user={}

@app.route('/')
def hello_world():
    return 'FoodSQL'

@app.route('/user/new', methods=['POST'])
def register():
    request_json = request.get_json();
    print(request_json['name'])
    user[request_json['email']] = [request_json['name'],request_json['password']]
    return jsonify(status=200)

@app.route('/user/login', methods=['GET', 'POST'])
def login():
    request_json = request.get_json();
    if request_json['email'] in user:
        print(user[request_json['email']])
        if user[request_json['email']][1] == request_json['password']:
            res = [{'status' : 200,
                    'msg'    : 'Login OK',
                    'name'   : user[request_json['email']][0]}]
            return jsonify(results=res)
    return jsonify(status=201,msg='Login Failed')
