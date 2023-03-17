from flask import Flask, request

app = Flask(__name__)
users = [
    {
        "name": "user",
        "roles": ["role1","role2"]
    }
        ]

@app.get("/users")
def get_users():
    return{"users" : users}

@app.post("/user")
def create_user():
    request_data = request.get_json()
    new_user = {"name": request_data["name"]}
    users.append(new_user)
    return {"status": "OK"}

