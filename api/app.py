from flask import Flask, request, Response
import os
from sqlalchemy.exc import IntegrityError
from db import db, ma
from UserModel import User, user_schema
from utils.email_validator import check_email
from utils.password import hash_password, compare_passwords

#init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#Init db
db.init_app(app)
#Init ma
ma.init_app(app)


# Create a User
@app.route('/register', methods=["POST"])
def add_user():
    email = request.json.get("email")
    password = request.json.get("password")
    name = request.json.get("name")
    if not email or not password:
        return Response('{"error": "Please make sure u included email and password"}', 400, mimetype='application/json')
    if not check_email(email):
        return Response('{"error": "Please make sure u inserted a valid email"}', 400, mimetype='application/json')
    if len(password) < 6:
        return Response('{"error": "Please make sure password is at least 6 characters"}', 400, mimetype='application/json')
    hashed_password = hash_password(password)
    email = email.lower()
    new_user = User(email, name, hashed_password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e: 
        return Response('{"error": "This email is already registered!"}', 400, mimetype='application/json')
    response = user_schema.jsonify(new_user).get_json()
    response.pop("password")
    return user_schema.jsonify(response)

# # Login User
@app.route("/login", methods=["POST"])
def get_product():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return Response('{"error": "Please make sure u included email and password"}', 400, mimetype='application/json')
    if not check_email(email):
        return Response('{"error": "Please make sure u inserted a valid email"}', 400, mimetype='application/json')

    user = User.query.filter_by(email=email).first()

    compared_passwords = compare_passwords(password, user.password)
    if compared_passwords:
        response = user_schema.jsonify(user).get_json()
        response.pop("password")
        return user_schema.jsonify(response)

    return Response('{"error": "Either email or password is wrong!"}', 400, mimetype='application/json')

# # Update a Product
# @app.route("/product/<id>", methods=["PUT"])
# def edit_product(id):
#     product = Product.query.get(id)

#     name = request.json["name"]
#     description = request.json["description"]
#     price = request.json["price"]
#     qty = request.json["qty"]

#     product.name = name
#     product.description = description
#     product.price = price
#     product.qty = qty

#     db.session.commit()

#     return product_schema.jsonify(product)

# # Delete Single Products
# @app.route("/product/<id>", methods=["DELETE"])
# def delete_product(id):
#     product = Product.query.get(id)
#     db.session.delete(product)
#     db.session.commit()
#     return product_schema.jsonify(product)

#Run server
if(__name__ == "__main__"):
    app.run(debug=True)
