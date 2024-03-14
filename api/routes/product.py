from flask import Blueprint, request, jsonify
from utils.db import db
from utils.dict import to_dict
from models.product import Product
from models.category import Category
from models.manufacturer import Manufacturer

product_bp = Blueprint('products', __name__)

# This endpoint is used to get all the products from the database.
@product_bp.route('/', methods=['GET'])
def get_products():
    products = db.session.query(Product).all()
    if not products: return jsonify({'message': 'No products found'}), 404
    response_array = []
    for product in products:
        response_array.append(to_dict(product))
    return jsonify(response_array), 200

# This endpoint is used to get a product from the database.
@product_bp.route('/<string:id>', methods=['GET'])
def get_product(id):
    request_id = id
    product = db.session.query(Product).filter_by(id=request_id).first()
    if not product: return jsonify({'message': 'Product not found'}), 404
    return jsonify(to_dict(product)), 200

# This endpoint is used to add a new product to the database.
@product_bp.route('/', methods=['POST'])
def new_product():
    '''
    JSON structure
    {
        "name": "testproduct",
        "promedy": 100,
        "rating": 5,
        "category_name": "testcategory",
        "manufacturer_name": "testmanufacturer"
    }
    '''
    print('product trying to register: ' + request.json['name'])
    request_name = request.json['name'].lower()
    request_promedy = float(request.json['promedy'])
    request_ratig = float(request.json['rating'])
    request_category = request.json['category_name'].lower()
    request_manufacturer = request.json['manufacturer_name'].lower()

    #Validation of data
    productExists = db.session.query(Product).filter_by(name=request_name).first()
    if productExists: return jsonify({'message': 'Product name already exists'}), 401

    category = db.session.query(Category).filter_by(name=request_category).first()
    if not category: return jsonify({'message': 'Category not found'}), 404

    manufacturer = db.session.query(Manufacturer).filter_by(name=request_manufacturer).first()
    if not manufacturer: return jsonify({'message': 'Manufacturer not found'}), 404
    print(manufacturer.id)
    new_product = Product(
        name=request_name,
        promedy=request_promedy,
        rating=request_ratig,
        category_id=category.id,
        manufacturer_id=manufacturer.id
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message': 'Product added successfully'}), 201

# This endpoint is used to update a product from the database.
@product_bp.route('/<string:name>', methods=['PUT'])
def update_product(name):
    '''
    JSON structure
    {
        "name": "testproduct",
        "promedy": 100,
        "rating": 5,
        "category_name": "testcategory",
        "manufacturer_name": "testmanufacturer"
    }
    '''
    request_name = name.lower()
    request_promedy = float(request.json['promedy'])
    request_ratig = float(request.json['rating'])
    request_category = request.json['category_name'].lower()
    request_manufacturer = request.json['manufacturer_name'].lower()
    
    product = db.session.query(Product).filter_by(name=request_name).first()
    if not product: return jsonify({'message': 'Product not found'}), 404


    category = db.session.query(Category).filter_by(name=request_category).first()
    if not category: return jsonify({'message': 'Category not found'}), 404

    manufacturer = db.session.query(Manufacturer).filter_by(name=request_manufacturer).first()
    if not manufacturer: return jsonify({'message': 'Manufacturer not found'}), 404

    product.name = request_name
    product.promedy = request_promedy
    product.rating = request_ratig
    product.category_id = category
    product.manufacturer_id = manufacturer

    db.session.commit()

    return jsonify({'message': 'Product updated successfully'}), 200

# This endpoint is used to delete a product from the database.
@product_bp.route('/<string:name>', methods=['DELETE'])
def delete_product(name):
    request_name = name.lower()
    product = db.session.query(Product).filter_by(name=request_name).first()
    if not product: return jsonify({'message': 'Product not found'}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted successfully'}), 200