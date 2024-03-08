from flask import Blueprint, request, jsonify
from utils.db import db
from models.user import User

users_bp = Blueprint('users', __name__)

# This endpoint is used to check if a user is in the database.
@users_bp.route('/', methods=['GET'])
def valid_user():
    '''
    JSON structure
    {
        "username": "teswuser",
        "password": "testpassword",
    }
    '''
    print('user trying to login: ' + request.json['username'])
    request_username = request.json['username'].lower()
    request_password = request.json['password']
    
    user = db.session.query(User).filter_by(username=request_username, password=request_password).first()

    if user:
        return jsonify({'valid':True, 'user':user.username}), 200
    return jsonify({'valid':False, 'user':None}), 401


# This endpoint is used to add a new user to the database.
@users_bp.route('/', methods=['POST'])
def new_user():
    '''
    JSON structure
    {
        "username": "teswuser",
        "password": "testpassword",
        "rif": "J-123456289",
        "email": "testuser@example.com"
    }
    '''
    print('user trying to register: ' + request.json['username'])
    
    request_username=request.json['username'].lower()
    request_password=request.json['password']
    request_rif=request.json['rif'].lower()
    request_email=request.json['email'].lower()


    #Validation of data
    userExists = db.session.query(User).filter_by(username=request_username).first()
    if userExists: return jsonify({'message': 'Username already taken'}), 401

    emailExists = db.session.query(User).filter_by(email=request_email).first()
    if emailExists : return jsonify({'message': 'Email already taken'}), 401

    rifExists = db.session.query(User).filter_by(rif=request_rif).first()
    if rifExists : return jsonify({'message': 'Rif already taken'}), 401

    new_user = User(
        username=request_username,
        password=request_password,
        rif=request_rif,
        email=request_email
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

#Endpoint to modify a user
@users_bp.route('/<string:username>', methods=['PUT'])
def modify_user(username):
    '''
    JSON structure
    {
        "username": "teswuser",
        "password": "testassword",
        "rif": "J-123456289",
        "email": "testeoail@gmail.com"
    }
    '''
    request_username = username.lower()
    request_password = request.json['password']
    request_rif = request.json['rif'].lower()
    request_email = request.json['email'].lower()

    user = db.session.query(User).filter_by(username=request_username).first()
    if not user: return jsonify({'message': 'User not found'}), 404
    
    user.password = request_password
    user.rif = request_rif
    user.email = request_email

    db.session.commit()

    return jsonify({'message': 'User modified successfully'}), 200

#Endpoint to delete a user
@users_bp.route('/<string:username>', methods=['DELETE'])
def delete_user(username):
    request_username = username.lower()
    user = db.session.query(User).filter_by(username=request_username).first()
    if not user: return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'}), 200
