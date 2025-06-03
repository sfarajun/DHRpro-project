from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate   # handles sql-alchemy migrations
import os
from flask_cors import CORS      # ← add this


# Load environment variables (I declared them in Dockerfile)
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)                         # ← enable CORS


# set app configs for sql alchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://localhost/appdb') # I dind't set up ENV uri so defaults here
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# initiate db and migrate
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models and routes
from models import Project, Task
from routes import register_blueprints
register_blueprints(app)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)