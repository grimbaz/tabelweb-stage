from flask import Flask, request

app = Flask(__name__)
users = [
    {
        "name": "user",
        "roles": ["role1", "role2"]
    }
]


@app.get("/users")
def get_users():
    return {"users": users}


@app.post("/users")
def create_user():
    request_data = request.get_json()
    new_user = {"name": request_data["name"], "roles": []}
    users.append(new_user)
    return new_user, 201


@app.post("/users/<string:name>/roles")
def create_roles(name):
    request_data = request.get_json()
    for user in users:
        if user["name"] == name:
            new_role = {"name": request_data["name"]}
            user["roles"].append(new_role)
            return new_role, 201
    return {"message": "user not found"}, 404
