from db import db, ma

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(100), unique = True)
    password = db.Column(db.String(72))
    name = db.Column(db.String(100))

    def __init__(self, email, name, password):

        self.email = email
        self.password = password
        self.name = name

# User Schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "email", "password", "name")

# Init Schema
user_schema = UserSchema()