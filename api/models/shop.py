from utils.db import db
from models.municipality import Municipality
class Shop(db.Model):
    id = db.Column(db.String(15), db.ForeignKey('user.rif'),primary_key=True, unique=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    municipality_id = db.Column(db.Integer, db.ForeignKey('municipality.id'))
    address = db.Column(db.String(120), unique=True, nullable=False)
    hasDelivery = db.Column(db.Boolean, nullable=False)
    website = db.Column(db.String(120), unique=True, nullable=False)
    socialMedia = db.Column(db.String(120), unique=True, nullable=False)
    rating = db.Column(db.Float, nullable=False)
