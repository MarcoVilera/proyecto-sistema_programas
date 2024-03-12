from flask import Blueprint, request, jsonify
from utils.db import db
from utils.dict import to_dict

from models.municipality import Municipality


municipality_bp = Blueprint('municipalities', __name__)

# This endpoint is used to get all the municipalities from the database.
@municipality_bp.route('/', methods=['GET'])
def get_municipalities():
    municipalities = db.session.query(Municipality).all()
    response_array = []
    if not municipalities: return jsonify({'message': 'No municipalities found'}), 404
    for municipality in municipalities:
        response_array.append(to_dict(municipality))

    return jsonify(response_array), 200

# This endpoint is used to get a municipality from the database.
@municipality_bp.route('/municipalities/<string:name>', methods=['GET'])
def get_municipality(name):
    request_name = name.lower()
    municipality = db.session.query(Municipality).filter_by(name=request_name).first()
    if not municipality: return jsonify({'message': 'Municipality not found'}), 401
    return jsonify(municipality.serialize()), 200

# This endpoint is used to add a new municipality to the database.
@municipality_bp.route('/', methods=['POST'])
def add_municipality():
    '''
    JSON structure
    {
        "name": "testmunicipality"
    }
    '''
    request_name = request.json['name'].lower()
    municipalityExists = db.session.query(Municipality).filter_by(name=request_name).first()
    if municipalityExists: return jsonify({'message': 'Municipality already exists'}), 401

    new_municipality = Municipality(
        name=request_name
    )

    db.session.add(new_municipality)
    db.session.commit()

    return jsonify({'message': 'Municipality created successfully'}), 201

# @municipality_bp.route('/municipalities/<string:name>', methods=['PUT'])
# def update_municipality(name):
#     '''
#     JSON structure
#     {
#         "name": "testmunicipality"
#     }
#     '''
#     request_name = name.lower()
#     municipality = db.session.query(Municipality).filter_by(name=request_name).first()
#     if not municipality: return jsonify({'message': 'Municipality not found'}), 401

#     municipality.name = request_name
#     db.session.commit()

#     return jsonify({'message': 'Municipality updated successfully'}), 200

# This endpoint is used to delete a municipality from the database.
@municipality_bp.route('/municipalities/<string:name>', methods=['DELETE'])
def delete_municipality(name):
    request_name = name.lower()
    municipality = db.session.query(Municipality).filter_by(name=request_name).first()
    if not municipality: return jsonify({'message': 'Municipality not found'}), 401

    db.session.delete(municipality)
    db.session.commit()

    return jsonify({'message': 'Municipality deleted successfully'}), 200

