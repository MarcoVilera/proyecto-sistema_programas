from flask import Blueprint, request, jsonify
from utils.db import db
from utils.dict import to_dict
from models.consolidate import Consolidate
from models.product import Product
from models.shop import Shop

consolidate_bp = Blueprint('consolidate', __name__)

# This endpoint is used to get all the consolidates from the database.
@consolidate_bp.route('/', methods=['GET'])
def get_consolidates():
    consolidates = db.session.query(Consolidate).all()
    response_array = []
    if not consolidates: return jsonify({'message': 'No consolidates found'}), 404
    for consolidate in consolidates:
        response_array.append(to_dict(consolidate))
    return response_array, 200

# This endpoint is used to get all the consolidates from a specific shop.
@consolidate_bp.route('/', methods=['POST'])
def new_consolidate():
    '''
    JSON structure
    {
        "shop_rif": "J-123456789",
        "product_name": "testproduct",
        "price": 100,
        "hasStock": true,
        "url": "testurl.com"
    }
    '''
    request_shop_rif = request.json['shop_rif']
    request_product_name = request.json['product_name']
    request_price = float(request.json['price'])
    request_hasStock = request.json['hasStock']
    request_url = request.json['url']

    #Validation of data
    product = db.session.query(Product).filter_by(name=request_product_name).first()
    if not product: return jsonify({'message': 'Product not found'}), 404

    shop = db.session.query(Shop).filter_by(rif=request_shop_rif).first()
    if not shop: return jsonify({'message': 'Shop not found'}), 404

    consolidateExists = db.session.query(Consolidate).filter_by(id_product=product.id, shop_rif=shop.rif).first()
    if consolidateExists: return jsonify({'message': 'Consolidate already exists'}), 401
    
    new_consolidate = Consolidate(
        shop_rif=shop.rif,
        id_product=product.id,
        price=request_price,
        hasStock=request_hasStock,
        url=request_url
    )

    db.session.add(new_consolidate)
    db.session.commit()

    return jsonify({'message': 'Consolidate created successfully'}), 201

# This endpoint is used to delete a consolidate from the database.
@consolidate_bp.route('/<string:shop_rif>', methods=['DELETE'])
def delete_consolidate(shop_rif):
    request_shop_rif = shop_rif
    consolidate = db.session.query(Consolidate).filter_by(shop_rif=request_shop_rif).first()
    if not consolidate: return jsonify({'message': 'Consolidate not found'}), 404
    db.session.delete(consolidate)
    db.session.commit()
    return jsonify({'message': 'Consolidate deleted successfully'}), 200