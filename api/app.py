from flask import Flask
from datetime import datetime
app = Flask(__name__)

@app.route('/')
def ping():
    return {'time':datetime.now(), 'message':'pong'}

if __name__ == '__main__':
    app.run(debug=True, port=5000)