from flask import Flask, request
from flask_cors import cross_origin

app = Flask(__name__)
users = [
    {
        "name": "grim baeke",
        "roles": ["role1", "role2"],
        "id": 34
    },
    {
        "name": "jeff steve",
        "roles": ["role2", "role5"],
        "id": 78
    },
    {
        "name": "john",
        "roles": ["role4", "role7"],
        "id": 56
    }
]
roles = [
    {
        "name": "role1"
    },
    {
        "name": "role2"
    },
    {
        "name": "role3"
    },
    {
        "name": "role4"
    },
    {
        "name": "role5"
    },
    {
        "name": "role6"
    },
    {
        "name": "role7"
    },
    {
        "name": "role8"
    },
    {
        "name": "role9"
    },
    {
        "name": "role10"
    },
    {
        "name": "role11"
    },
    {
        "name": "role12"
    },
    {
        "name": "role13"
    },
    {
        "name": "role14"
    },
    {
        "name": "role15"
    },
    {
        "name": "role16"
    },
    {
        "name": "role17"
    },
    {
        "name": "role18"
    },
    {
        "name": "role19"
    },
    {
        "name": "role20"
    }
]


@app.get("/users")
@cross_origin()
def get_users():
    return {"users": users}


@app.post("/users")
@cross_origin()
def create_user():
    global counter
    request_data = request.get_json()
    new_user = {"id": counter, "name": request_data["name"], "roles": request_data["roles"]}
    users.append(new_user)
    counter += 1
    return {"id": new_user["id"], "name": new_user["name"], "roles": new_user["roles"]}, 201


@app.post("/users/<string:name>/role")
@cross_origin()
def add_roles(name):
    request_data = request.get_json()
    for user in users:
        if user["name"] == name:
            new_role = [request_data["roles"]]
            user["roles"].append(new_role)
            return new_role, 201
    return {"message": "user not found"}, 404


@app.get("/users/<string:name>")
@cross_origin()
def get_user(name):
    for user in users:
        if user["name"] == name:
            return user
    return {"message": "user not found"}


@app.delete("/users/<string:name>")
@cross_origin()
def del_users(name):
    del_user = None
    for user in users:
        if user["name"] == name:
            del_user = user
            break
    if del_user is None:
        return {"message": "user not found"}, 404
    else:
        users.remove(del_user)
        return {"message": "user removed"}, 201


@app.put('/users/<string:name>')
@cross_origin()
def update_roles(name):
    # Check if user exist.
    request_data = request.get_json()
    # enumerate(): looks in what place the user is en the index is the number that the user is placed in that list so we loop 3th user and the index is gonna be 3
    for index, user in enumerate(users):
        # Replace user entry in users
        if user["name"] == name:
            user["name"] = request_data["name"]
            user["roles"] = request_data["roles"]
            return {"message": "user changed"}
    return {"message": "user not found"}, 404



@app.get("/roles")
@cross_origin()
def get_roles():
    return {"roles": roles}


@app.post("/roles")
@cross_origin()
def create_roles():
    request_data = request.get_json()
    new_role = {"name": request_data["name"]}
    roles.append(new_role)
    return new_role, 201


@app.delete("/roles/<string:name>")
@cross_origin()
def del_role(name):
    del_roles = None
    for role in roles:
        if role["name"] == name:
            del_roles = role
            break
    if del_roles is None:
        return {"message": "role not found"}, 404
    else:
        roles.remove(del_roles)
        return {"message": "role removed"}, 201


@app.get("/roles/<string:name>")
@cross_origin()
def get_role(name):
    for role in roles:
        if role["name"] == name:
            return role
    return {"message": "role not found"}
