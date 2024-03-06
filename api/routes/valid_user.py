from flask import Blueprint, request, jsonify
from utils.db import db
from models.user import User
valid_user_bp = Blueprint('valid_user', __name__)

# This endpoint is used to check if a user is in the database.
@valid_user_bp.route('/')
def valid_user():
    '''
    JSON structure
    {
        "username":"testuser",
        "password":"testpassword"
    }
    '''
    print('user trying to login: ' + request.json['username'])
    data = request.get_json()
    user = db.session.query(User).filter_by(username=data['username'], password=data['password']).first()
    if user:
        return jsonify({'valid':True, 'user':user.username}), 200
    return jsonify({'valid':False, 'user':None}), 401
        