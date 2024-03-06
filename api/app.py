from flask import Flask
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from utils.db import db
from datetime import datetime
import os

#Endpoints Imports
from routes.valid_user import valid_user_bp
from routes.new_user import new_user_bp
from routes.new_shop import new_shop_bp

load_dotenv() #loads environment variables from .env file

def create_app(): # Function to create the app and set the database connection settings
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL') # Database connection string
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return app


app = create_app()
# The ping route is used to test the connection to the server.
@app.route('/')
def ping():
    return {'time':datetime.now(), 'message':'pong'}

# Endpoint to check if a user is in the database.
app.register_blueprint(valid_user_bp, url_prefix='/valid_user')

# Endpoint to add a new user to the database.
app.register_blueprint(new_user_bp, url_prefix='/new_user')

# Endpoint to add a new shop to the database.
app.register_blueprint(new_shop_bp, url_prefix='/new_shop')

# Create the database tables in case they don't exist.
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)