from flask import Blueprint, request, jsonify
from utils.db import db
from utils.dict import to_dict
from models.shop import Shop
from models.user import User
from models.municipality import Municipality

shops_bp = Blueprint('shops', __name__)

# This endpoint is used to get all the shops in the database.
@shops_bp.route('/', methods=['GET'])
def get_shops():
    shops = db.session.query(Shop).all()
    response_array=[]
    if not shops: return jsonify({'message': 'No shops found'}), 404

    for shop in shops:
        response_array.append(to_dict(shop))

    return jsonify(response_array), 200

# This endpoint is used to get a shop by its rif.
@shops_bp.route('/<string:rif>', methods=['GET'])
def get_shop(rif):
    request_rif=rif.lower()
    shop = db.session.query(Shop).filter_by(rif=request_rif).first()
    if not shop: return jsonify({'message': 'Shop not found'}), 404

    return jsonify(to_dict(shop)), 200

# This endpoint is used to add a new shop to the database.
@shops_bp.route('/', methods=['POST'])
def new_shop():
    '''
    JSON structure
    {
        "rif": "J-123456289",
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

    request_rif = request.json['rif'].lower()
    request_name = request.json['name'].lower()
    request_phone = request.json['phone']
    request_municipality = request.json['municipality_name'].lower()
    request_address = request.json['address'].lower()
    request_hasDelivery = request.json['hasDelivery']
    request_website = request.json['website'].lower()
    request_socialMedia = request.json['socialMedia'].lower()
    request_rating = float(request.json['rating'])
    
    #Validation of data
    user_rif = db.session.query(User).filter_by(rif=request_rif).first()
    if not user_rif: return jsonify({'message': 'RIF not found'}), 401

    shopExists = db.session.query(Shop).filter_by(name=request_name).first()
    if shopExists: return jsonify({'message': 'Shop name already taken'}), 401

    shop_municipality = db.session.query(Municipality).filter_by(name=request_municipality).first()
    if not shop_municipality: return jsonify({'message': 'Municipality not found'}), 401

    new_shop = Shop(
        rif = user_rif.rif,
        name = request_name,
        phone = request_phone,
        municipality_id = shop_municipality.id,
        address = request_address,
        hasDelivery = request_hasDelivery,
        website = request_website,
        socialMedia = request_socialMedia,
        rating = request_rating
    )

    db.session.add(new_shop)
    db.session.commit()

    return jsonify({'message': 'Shop created successfully'}), 201

#Endpoint to modify a shop
@shops_bp.route('/<string:rif>', methods=['PUT'])
def modify_shop(rif):
    '''
    JSON structure
    {
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
    request_rif = rif.lower()
    request_name = request.json['name'].lower()
    request_phone = request.json['phone']
    request_municipality = request.json['municipality_name'].lower()
    request_address = request.json['address'].lower()
    request_hasDelivery = request.json['hasDelivery']
    request_website = request.json['website'].lower()
    request_socialMedia = request.json['socialMedia'].lower()
    request_rating = float(request.json['rating'])

    shop = db.session.query(Shop).filter_by(rif=request_rif).first()
    if not shop: return jsonify({'message': 'Shop not found'}), 404


    shop_municipality = db.session.query(Municipality).filter_by(name=request_municipality).first()
    if not shop_municipality: return jsonify({'message': 'Municipality not found'}), 401
    
    shop.name = request_name
    shop.phone = request_phone
    shop.municipality_id = shop_municipality.id
    shop.address = request_address
    shop.hasDelivery = request_hasDelivery
    shop.website = request_website
    shop.socialMedia = request_socialMedia
    shop.rating = request_rating

    db.session.commit()

    return jsonify({'message': 'Shop modified successfully'}), 200


#Endpoint to delete a shop
@shops_bp.route('/<string:rif>', methods=['DELETE'])
def delete_shop(rif):
    request_rif = rif.lower()
    shop = db.session.query(Shop).filter_by(rif=request_rif).first()
    if not shop: return jsonify({'message': 'Shop not found'}), 404

    db.session.delete(shop)
    db.session.commit()

    return jsonify({'message': 'Shop deleted successfully'}), 200