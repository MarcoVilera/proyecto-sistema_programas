from flask import Blueprint, request, jsonify
from utils.db import db
from models.shop import Shop
from models.user import User
from models.municipality import Municipality

new_shop_bp = Blueprint('new_shop', __name__)

@new_shop_bp.route('/', methods=['POST'])
# This endpoint is used to add a new shop to the database.
def new_shop():
    '''
    JSON structure
    {
        "id": "J-123456289",
        "name": "testshop",
        "phone": "04121234567",
        "municipality_name": "testmunicipality",
        "address": "testaddress",
        "hasDelivery": true,
        "website": "testwebsite",
        "socialMedia": "testsocialMedia",
        "rating": 5
    }
    '''
    print('shop trying to register: ' + request.json['name'])
    data = request.get_json()
    
    #Validation of data
    user_rif = db.session.query(User).filter_by(rif=data['id']).first()
    if not user_rif: return jsonify({'message': 'RIF not found'}), 401

    shopExists = db.session.query(Shop).filter_by(name=data['name']).first()
    if shopExists: return jsonify({'message': 'Shop name already taken'}), 401


    shop_municipality = db.session.query(Municipality).filter_by(name=data['municipality_name']).first()
    new_shop = Shop(
        id = user_rif.rif,
        name=data['name'],
        phone=data['phone'],
        municipality_id=shop_municipality.id,
        address=data['address'],
        hasDelivery=data['hasDelivery'],
        website=data['website'],
        socialMedia=data['socialMedia'],
        rating=data['rating']
    )

    db.session.add(new_shop)
    db.session.commit()

    return jsonify({'message': 'Shop created successfully'}), 201

#TODO Añadir ruta para modificar/eliminar tienda