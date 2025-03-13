from flask import Flask, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

# 🔥 Initialize Firebase
cred = credentials.Certificate("../aquaflow_embedded-system/aqwaflow-firebase-adminsdk-fbsvc-fca1477020.json")  # Update with your actual path
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)
CORS(app)  # Enable CORS
USER_ID = None  # Stores logged-in user's ID

@app.route('/set_user', methods=['POST'])
def set_user():
    """Receives user ID from Flutter and stores it globally."""
    global USER_ID
    data = request.json
    print(f"Received data: {data}")  # Debugging
    if "user_id" in data:
        USER_ID = data["user_id"]
        print(f"User ID set to {USER_ID}")  # Debugging
        return {"message": f"User ID set to {USER_ID}"}, 200
    else:
        print("No user ID provided")  # Debugging
        return {"error": "No user ID provided"}, 400

@app.route('/get_user', methods=['GET'])
def get_user():
    """Allows other scripts (water_server.py) to fetch the current user ID."""
    global USER_ID
    if USER_ID:
        return {"user_id": USER_ID}, 200
    else:
        return {"error": "No user logged in"}, 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)