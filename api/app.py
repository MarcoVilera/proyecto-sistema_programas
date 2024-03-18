from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from utils.db import db
from datetime import datetime
import os

#Endpoints Imports
#TODO Verificar imports
from routes.users import users_bp
from routes.shops import shops_bp
from routes.municipality import municipality_bp
from routes.category import category_bp
from routes.product import product_bp
from routes.manufacturer import manufacturer_bp
from routes.consolidate import consolidate_bp

load_dotenv() #loads environment variables from .env file

def create_app(): # Function to create the app and set the database connection settings
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL') # Database connection string
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return app


app = create_app()
CORS(app,origins=["http://localhost:5173"])
# The ping route is used to test the connection to the server.
@app.route('/')
def ping():
    return {'time':datetime.now(), 'message':'pong'}

app.register_blueprint(users_bp, url_prefix='/users')

app.register_blueprint(shops_bp, url_prefix='/shops')

app.register_blueprint(municipality_bp, url_prefix='/municipalities')

app.register_blueprint(category_bp, url_prefix='/categories')

app.register_blueprint(manufacturer_bp, url_prefix='/manufacturers')

app.register_blueprint(product_bp, url_prefix='/products')

app.register_blueprint(consolidate_bp, url_prefix='/consolidated')

# Create the database tables in case they don't exist.
with app.app_context():
    db.create_all()
    #db.drop_all() # Use this line to drop all tables in the database

if __name__ == '__main__':
    app.run(debug=True, port=5000)