from flask import Flask, request, jsonify

app = Flask(__name__)

users = [
    {'name': 'User 1', 'roles': ['Role 1', 'Role 2']},
    {'name': 'User 2', 'roles': ['Role 3', 'Role 4', 'Role 5']},
    {'name': 'User 3', 'roles': ['Role 2', 'Role 5', 'Role 8']},
]

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/users', methods=['POST'])
def add_user():
    new_user = request.get_json()
    users.append(new_user)
    return jsonify(new_user)

@app.route('/users/<name>', methods=['GET'])
def get_user(name):
    user = next((user for user in users if user['name'] == name), None)
    if user:
        return jsonify(user)
    else:
        return 'User not found', 404

@app.route('/users/<name>', methods=['PUT'])
def update_user(name):
    user = next((user for user in users if user['name'] == name), None)
    if user:
        user.update(request.get_json())
        return jsonify(user)
    else:
        return 'User not found', 404

@app.route('/users/<name>', methods=['DELETE'])
def delete_user(name):
    global users
    users = [user for user in users if user['name'] != name]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
