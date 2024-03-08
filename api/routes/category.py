from flask import Blueprint, request, jsonify
from utils.db import db
from utils.dict import to_dict
from models.category import Category

category_bp = Blueprint('category', __name__)

# This endpoint is used to get all the categories from the database.
@category_bp.route('/', methods=['GET'])
def get_categories():
    categories = db.session.query(Category).all()
    response_array=[]
    if not categories: return jsonify({'message': 'No categories found'}), 404

    for category in categories:
        response_array.append(to_dict(category))

    return jsonify(response_array), 200

# This endpoint is used to add a new category to the database.
@category_bp.route('/', methods=['POST'])
def new_category():
    '''
    JSON structure
    {
        "name": "testcategory"
    }
    '''
    print('category trying to register: ' + request.json['name'])
    request_name = request.json['name'].lower()

    #Validation of data
    categoryExists = db.session.query(Category).filter_by(name=request_name).first()
    if categoryExists: return jsonify({'message': 'Category name already exists'}), 401

    #id autogenerates
    new_category = Category(
        name=request_name
    )

    db.session.add(new_category)
    db.session.commit()

    return jsonify({'message': 'Category added successfully'}), 201

# This endpoint is used to delete a category from the database.
@category_bp.route('/<string:name>', methods=['DELETE'])
def delete_category(name):
    request_name = name.lower()
    category = db.session.query(Category).filter_by(name=name).first()
    if not category: return jsonify({'message': 'Category not found'}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({'message': 'Category deleted successfully'}), 200