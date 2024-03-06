from flask import Blueprint, request, jsonify
from utils.db import db
from models.user import User

new_user_bp = Blueprint('new_user', __name__)
# This endpoint is used to add a new user to the database.

@new_user_bp.route('/', methods=['POST'])
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
    data = request.get_json()

    #Validation of data
    userExists = db.session.query(User).filter_by(username=data['username']).first()
    
    if userExists: return jsonify({'message': 'Username already taken'}), 401

    emailExists = db.session.query(User).filter_by(email=data['email']).first()
    if emailExists : return jsonify({'message': 'Email already taken'}), 401

    rifExists = db.session.query(User).filter_by(rif=data['rif']).first()
    if rifExists : return jsonify({'message': 'Rif already taken'}), 401

    new_user = User(
        username=data['username'],
        password=data['password'],
        rif=data['rif'],
        email=data['email']
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

#TODO Añadir ruta para modificar/eliminar usuario