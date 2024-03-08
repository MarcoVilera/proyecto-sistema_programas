from utils.db import db

class Manufacturer(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    products = db.relationship('Product', backref='manufacturer')
    
    