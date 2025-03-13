import socket
import firebase_admin
import requests
from firebase_admin import credentials, firestore

# 🔥 Initialize Firebase Admin
cred = credentials.Certificate("aqwaflow-firebase-adminsdk-fbsvc-fca1477020.json")  # Update with actual path
firebase_admin.initialize_app(cred)
db = firestore.client()

# 🌐 API URL to fetch user ID
USER_ID_API = "http://127.0.0.1:5000/get_user"  # Points to firebase_server.py

def get_user_id():
    """Fetch the logged-in user ID from firebase_server.py"""
    try:
        response = requests.get(USER_ID_API)
        if response.status_code == 200:
            return response.json().get("user_id", None)
        return None
    except Exception as e:
        print(f"❌ Error fetching user ID: {e}")
        return None

def update_firestore(action, active):
    """Update the Firestore database with the given action and active state."""
    user_id = get_user_id()
    if not user_id:
        print("❌ No user ID set. Skipping database update.")
        return

    try:
        db.collection("users").document(user_id).collection("actions").document(action).set({'active': active})
        print(f"✅ Firestore updated: {action} set to {active}")
    except Exception as e:
        print(f"❌ Error updating Firestore: {e}")

HOST = '127.0.0.1'
PORT = 65432

def send_command(cmd):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.sendall(cmd.encode())
        response = s.recv(1024).decode()
        print(response)

print("💻 Command Terminal (type 'exit' to quit)")
print("Commands: make a leak, stop leak, stop water, start water, status")
while True:
    cmd = input(">> ").strip().lower()
    if cmd == "exit":
        break
    send_command(cmd)
    if cmd in ["make a leak", "stop leak", "stop water", "start water"]:
        action = cmd.replace(" ", "_")
        active = cmd.startswith("make") or cmd.startswith("stop")
        update_firestore(action, active)