from flask import Flask
from flask_cors import CORS
from assistants.strategico import strategico_blueprint  # import the blueprint from each assistant file

app = Flask(__name__)
app.debug = True
CORS(app, resources={r"/*": {"origins": "*"}})  # This will allow your React app to communicate with this server

app.register_blueprint(strategico_blueprint)  # register each blueprint with your Flask app

if __name__ == "__main__":
    app.run()