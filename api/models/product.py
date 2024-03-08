from utils.db import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    manufacturer_id = db.Column(db.Integer, db.ForeignKey('manufacturer.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    promedy = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    consolidates = db.relationship('Consolidate', backref='product')
