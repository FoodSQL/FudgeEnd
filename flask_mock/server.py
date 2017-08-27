from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'FoodSQL'

@app.route('/user/new', methods=['POST'])
def register():
    if request.method == 'OPTIONS':
        print("HELLO")
        json = request.get_json();
        print(json['body']['name'])
        return('hello_world')
        #return jsonify(status=200)
