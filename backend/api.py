#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask, request, jsonify

app = Flask(__name__)

# Define a list of users for testing purposes
users = [{'username': 'user1', 'roles': ['Role 1', 'Role 2']},
         {'username': 'user2', 'roles': ['Role 3', 'Role 4']}]

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/users/<username>', methods=['GET'])
def get_user(username):
    for user in users:
        if user['username'] == username:
            return jsonify(user)
    return jsonify({'error': 'User not found'})

@app.route('/users/<username>', methods=['PUT'])
def update_user(username):
    new_user = json.loads(request.data)
    for user in users:
        if user['username'] == username:
            user['roles'] = new_user['roles']
            return jsonify(user)
    return jsonify({'error': 'User not found'})

@app.route('/users/<username>', methods=['DELETE'])
def delete_user(username):
    for user in users:
        if user['username'] == username:
            users.remove(user)
            return jsonify(user)
    return jsonify({'error': 'User not found'})

@app.route('/users', methods=['POST'])
def create_user():
    new_user = json.loads(request.data)
    users.append(new_user)
    return jsonify(new_user)

app.run(debug=True)
