from flask import Blueprint, request, jsonify
from utils.db import db
from utils.dict import to_dict
from models.manufacturer import Manufacturer


manufacturer_bp = Blueprint('manufacturers', __name__)

# This endpoint is used to get all the manufacturers from the database.
@manufacturer_bp.route('/', methods=['GET'])
def get_manufacturers():
    manufacturers = db.session.query(Manufacturer).all()
    response_array=[]
    if not manufacturers: return jsonify({'message': 'No manufacturers found'}), 404

    for manufacturer in manufacturers:
        response_array.append(manufacturer.to_dict())

    return jsonify(response_array), 200

# This endpoint is used to get a manufacturer from the database.
@manufacturer_bp.route('/<string:name>', methods=['GET'])
def get_manufacturer(name):
    request_name = name.lower()
    manufacturer = db.session.query(Manufacturer).filter_by(name=request_name).first()
    if not manufacturer: return jsonify({'message': 'Manufacturer not found'}), 404

    return jsonify(manufacturer.to_dict()), 200

# This endpoint is used to add a new manufacturer to the database.
@manufacturer_bp.route('/', methods=['POST'])
def new_manufacturer():
    '''
    JSON structure
    {
        "name": "testmanufacturer"
    }
    '''
    print('manufacturer trying to register: ' + request.json['name'])
    request_name = request.json['name'].lower()

    #Validation of data
    manufacturerExists = db.session.query(Manufacturer).filter_by(name=request_name).first()
    if manufacturerExists: return jsonify({'message': 'Manufacturer name already exists in the database'}), 401

    new_manufacturer = Manufacturer( name=request_name )
    db.session.add(new_manufacturer)
    db.session.commit()
    return jsonify({'message': 'Manufacturer added successfully'}), 201


# This endpoint is used to delete a manufacturer from the database.
@manufacturer_bp.route('/<string:name>', methods=['DELETE'])
def delete_manufacturer(name):
    request_name = name.lower()
    manufacturer = db.session.query(Manufacturer).filter_by(name=request_name).first()
    if not manufacturer: return jsonify({'message': 'Manufacturer not found'}), 404

    db.session.delete(manufacturer)
    db.session.commit()

    return jsonify({'message': 'Manufacturer deleted successfully'}), 200