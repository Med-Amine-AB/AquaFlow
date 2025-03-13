import threading
import time
import random
import socket
import requests  # Added for HTTP requests
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

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

# 🌊 Global simulation state
leak_mode = False
water_shutoff = False
high_usage_counter = 0
threshold = 1.5
minute_duration = 10  # Simulated minutes (5 sec per real minute)
state_lock = threading.Lock()

# 🔌 Socket setup for commands
HOST = '127.0.0.1'
PORT = 65432

def push_water_usage_to_firebase(usage):
    """Pushes a new water usage reading under the logged-in user's subcollection."""
    user_id = get_user_id()
    if not user_id:
        print("❌ No user ID set. Skipping database update.")
        return

    with state_lock:
        status = "leak_detected" if leak_mode or water_shutoff else "normal"
        auto_block = water_shutoff

    data = {
        "timestamp": datetime.utcnow(),
        "usage_liters": usage,
        "status": status,
        "auto_block": auto_block
    }

    try:
        db.collection("users").document(user_id).collection("water_usage").add(data)
        print(f"✅ Data saved for user {user_id}: {usage}L")
    except Exception as e:
        print(f"❌ Error writing to Firestore: {e}")

def handle_client(conn):
    global leak_mode, water_shutoff, high_usage_counter
    with conn:
        while True:
            cmd = conn.recv(1024).decode().strip().lower()
            if not cmd:
                break
            with state_lock:
                if cmd == "make a leak":
                    leak_mode = True
                    response = "💥 Leak simulation activated!"
                elif cmd == "stop leak":
                    leak_mode = False
                    high_usage_counter = 0
                    response = "👍 Leak simulation deactivated!"
                elif cmd == "stop water":
                    water_shutoff = True
                    response = "🔒 Water manually shut off!"
                elif cmd == "start water":
                    water_shutoff = False
                    high_usage_counter = 0
                    response = "🚰 Water resumed!"
                elif cmd == "status":
                    response = f"Status - 💧 Leak: {leak_mode}, 🔒 Shutoff: {water_shutoff}, Counter: {high_usage_counter}"
                else:
                    response = "❓ Unknown command."
                conn.sendall(response.encode())

def start_socket_server():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()
        while True:
            conn, _ = s.accept()
            threading.Thread(target=handle_client, args=(conn,), daemon=True).start()

def simulate_water_usage():
    global leak_mode, water_shutoff, high_usage_counter
    while True:
        with state_lock:
            if water_shutoff:
                usage = 0.0
            else:
                usage = round(random.uniform(2.0, 8.0), 2) if leak_mode else round(random.uniform(0.4, 1.0), 2)

        # 🖥️ Print status
        if water_shutoff:
            print("🔒 Water is shut off! Usage: 0.0 L")
        else:
            print(f"{'💧 LEAK! ' if leak_mode else '🚰 Normal'} Usage: {usage} L")

        # 🚀 Push data to Firebase
        push_water_usage_to_firebase(usage)

        # 📏 Leak detection logic
        with state_lock:
            if not water_shutoff and usage > threshold:
                high_usage_counter += 1
            else:
                high_usage_counter = 0

        # ⏳ Leak alert process
        if high_usage_counter >= 5:
            print("⚠️  Leak detected! Waiting 2 minutes for response...")
            for i in range(2):
                time.sleep(minute_duration)
                with state_lock:
                    if water_shutoff or not leak_mode:
                        print("✅ Leak resolved!")
                        high_usage_counter = 0
                        break
                print(f"⏰ Waiting... ({i + 1}/2)")
            else:
                with state_lock:
                    if leak_mode and not water_shutoff:
                        water_shutoff = True
                        print("🔒 Auto-shutoff: Water stopped!")

        time.sleep(minute_duration)

def listen_for_actions():
    """Listen for changes in the actions collection and update the state accordingly."""
    user_id = get_user_id()
    if not user_id:
        print("❌ No user ID set. Skipping actions listener.")
        return

    def on_snapshot(doc_snapshot, changes, read_time):
        global leak_mode, water_shutoff
        for doc in doc_snapshot:
            data = doc.to_dict()
            if doc.id == "stop_leak":
                leak_mode = data.get("active", False)
                print(f"🔄 Leak mode updated: {leak_mode}")
            elif doc.id == "stop_water":
                water_shutoff = data.get("active", False)
                print(f"🔄 Water shutoff updated: {water_shutoff}")

    actions_ref = db.collection("users").document(user_id).collection("actions")
    actions_ref.on_snapshot(on_snapshot)

if __name__ == "__main__":
    threading.Thread(target=start_socket_server, daemon=True).start()
    threading.Thread(target=listen_for_actions, daemon=True).start()
    simulate_water_usage()