from utils.db import db

class Municipality(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    name = db.Column(db.String(100), nullable=False)
    shops = db.relationship('Shop', backref='municipality')