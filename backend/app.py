from flask import Flask, request

app = Flask(__name__)
users = [
    {
        "name": "grim",
        "roles": ["role1", "role2"]
    }
]
roles = [
    {
        "name": "role1"
    },
    {
        "name": "role2"
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


@app.post("/users/<string:name>/role")
def add_roles(name):
    request_data = request.get_json()
    for user in users:
        if user["name"] == name:
            new_role = [request_data["roles"]]
            user["roles"].append(new_role)
            return new_role, 201
    return {"message": "user not found"}, 404


@app.get("/users/<string:name>")
def get_user(name):
    for user in users:
        if user["name"] == name:
            return user
    return {"message": "user not found"}


@app.delete("/users/<string:name>")
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
def update_roles(name):
    # Check if user exist.
    request_data = request.get_json()
    #enumerate(): looks in what place the user is en the index is the number that the user is placed in that list so we loop 3th user and the index is gonna be 3
    for index, user in enumerate(users):
        # Replace user entry in users
        if user["name"] == name:
            users[index] = request_data
            return {"message": "user changed"}
    return {"message": "user not found"}, 404


@app.get("/roles")
def get_roles():
    return {"roles": roles}


@app.post("/roles")
def create_roles():
    request_data = request.get_json()
    new_role = {"name": request_data["name"]}
    roles.append(new_role)
    return new_role, 201


@app.delete("/roles/<string:name>")
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
def get_role(name):
    for role in roles:
        if role["name"] == name:
            return role
    return {"message": "role not found"}
