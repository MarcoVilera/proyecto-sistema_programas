from utils.db import db

class Consolidate(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    shop_rif = db.Column(db.String(150), db.ForeignKey('shop.rif'),nullable=False)
    id_product = db.Column(db.Integer, db.ForeignKey('product.id'),nullable=False)
    price = db.Column(db.Float, nullable=False)
    hasStock = db.Column(db.Boolean, nullable=False)