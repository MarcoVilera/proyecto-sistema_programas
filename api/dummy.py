import json
import sys
from app import app
#MODELS
from models.shop import Shop
from models.product import Product
from models.user import User
from models.municipality import Municipality
from models.category import Category
from models.consolidate import Consolidate
from models.manufacturer import Manufacturer
from utils.db import db
def create_dummy_data():
    with open('./data.json', 'r', encoding='utf-8') as dummy_data:

        categoriesDB = []
        manufacturersDB = []
        municipalitiesDB = []
        
        productsDB = []
        usersDB = []
        shopsDB = []
        consolidatesDB = []
        data = json.load(dummy_data)
        for category in data['categories']:
            categoriesDB.append(Category(name=category['name']))
        
        for manufacturer in data['manufacturers']:
            manufacturersDB.append(Manufacturer(name=manufacturer['name']))

        for municipality in data['municipalities']:
            municipalitiesDB.append(Municipality(name=municipality['name']))
        
        for product in data['products']:
            # print(product['name'])
            try:
                category_id = [category['name'] for category in data['categories']].index(product['category'])+1
                manufacturer_id = [manufacturer['name'] for manufacturer in data['manufacturers']].index(product['manufacturer'])+1
            except:
                print(f"Category {product['category']} not found")
                sys.exit(1)
            productsDB.append(Product(
                name=product['name'],
                promedy=product['price'],
                category_id= category_id,
                manufacturer_id= manufacturer_id,
                rating=product['rating']
            ))

        for user in data['users']:
            usersDB.append(User(
                username=user['username'],
                password=user['password'],
                email=user['email'],
                rif=user['rif']
            ))

        for shop in data['shops']:
            try:
                municipality_id = [municipality['name'] for municipality in data['municipalities']].index(shop['municipality'])+1
            except:
                print(f"Shop {shop['name']} not found")
                sys.exit(1)
            shopsDB.append(Shop(
                rif=shop['rif'],
                name=shop['name'],
                phone=shop['phone'],
                municipality_id=municipality_id,
                address=shop['address'],
                hasDelivery=shop['hasDelivery'],
                website=shop['website'],
                socialMedia=shop['socialMedia'],
                rating=shop['rating'],
                verified=shop['verified']
            ))

        for consolidate in data['consolidates']:
            try:
                shop_rif = [shop['rif'] for shop in data['shops'] if shop['name'] == consolidate['shop']][0]
                product_id = [product['name'] for product in data['products']].index(consolidate['product'])+1
            except:
                print(f"Consolidate {consolidate['shop']} not found")
                sys.exit(1)
            consolidatesDB.append(Consolidate(
                shop_rif=shop_rif,
                id_product=product_id,
                hasStock=consolidate['stock'],
                price=consolidate['price'],
                url=consolidate['thumbnail']
            ))
        print(f"Se han generado {len(categoriesDB)} categorias en la base de datos")
        print(f"Se han generado {len(manufacturersDB)} fabricantes en la base de datos")
        print(f"Se han generado {len(municipalitiesDB)} municipios en la base de datos")
        print(f"Se han generado {len(productsDB)} productos en la base de datos")
        print(f"Se han generado {len(usersDB)} usuarios en la base de datos")
        print(f"Se han generado {len(shopsDB)} tiendas en la base de datos")
        print(f"Se han generado {len(consolidatesDB)} consolidados en la base de datos")
        db.session.add_all(categoriesDB)
        db.session.add_all(manufacturersDB)
        db.session.add_all(municipalitiesDB)
        db.session.add_all(productsDB)
        db.session.add_all(usersDB)
        db.session.add_all(shopsDB)
        db.session.add_all(consolidatesDB)
        db.session.commit()

with app.app_context():
    db.create_all()
    create_dummy_data()