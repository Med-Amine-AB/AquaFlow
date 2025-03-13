import threading
import time
import random
import socket
import requests  # For HTTP requests to fetch the user ID
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import numpy as np
from tensorflow.keras.models import load_model
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
from collections import deque

#########################################
# Firebase & ML Model Initialization
#########################################

# Initialize Firebase Admin with your service account
cred = credentials.Certificate("aqwaflow-firebase-adminsdk-fbsvc-fca1477020.json")  # Update with your file path
firebase_admin.initialize_app(cred)
db = firestore.client()

# API URL to fetch the logged-in user ID from your Firebase server (firebase_server.py)
USER_ID_API = "http://127.0.0.1:5000/get_user"  # Make sure this matches your firebase_server.py endpoint

def get_user_id():
    """Fetch the logged-in user ID from firebase_server.py."""
    try:
        response = requests.get(USER_ID_API)
        if response.status_code == 200:
            return response.json().get("user_id", None)
        return None
    except Exception as e:
        print(f"❌ Error fetching user ID: {e}")
        return None

# Load the trained LSTM model (.h5 file) with a custom object mapping for "mse"
MODEL_PATH = "../aquaflow_ml/machine learning/modele_fuite_eau.h5"  # Update with your model path
model = load_model(MODEL_PATH, custom_objects={'mse': tf.keras.losses.MeanSquaredError})

# Initialize a scaler.
# NOTE: Ideally, load the scaler parameters used during training. For demo, we fit on dummy data.
scaler = StandardScaler()
dummy_data = np.array([[0.4], [1.0]])  # Expected range of normal water usage
scaler.fit(dummy_data)

# Buffer to store the last 10 water usage readings (for LSTM input)
seq_length = 10
water_usage_history = deque(maxlen=seq_length)

#########################################
# Global Simulation State & Socket Setup
#########################################

# Global simulation state variables
leak_mode = False
water_shutoff = False
high_usage_counter = 0
# Simulated minute duration (in seconds). For testing, you might use 10 seconds = 1 simulated minute.
minute_duration = 10
state_lock = threading.Lock()

# Socket configuration for receiving commands
HOST = '127.0.0.1'
PORT = 65432

#########################################
# Functions to Push Data & Handle Commands
#########################################

def push_water_usage_to_firebase(usage):
    """Push a water usage reading under the logged-in user's subcollection."""
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

#########################################
# Main Simulation Loop with ML Integration
#########################################

def simulate_water_usage():
    global leak_mode, water_shutoff, high_usage_counter

    # Define an anomaly threshold for the model (tune this based on your model performance)
    anomaly_threshold = 0.5  # For example, if error > 0.5 L, consider it anomalous

    while True:
        with state_lock:
            if water_shutoff:
                usage = 0.0
            else:
                # Simulate high usage if leak_mode is manually activated, otherwise normal usage.
                usage = round(random.uniform(2.0, 8.0), 2) if leak_mode else round(random.uniform(0.4, 1.0), 2)

        # Print water usage status
        if water_shutoff:
            print("🔒 Water is shut off! Usage: 0.0 L")
        else:
            print(f"{'💧 LEAK! ' if leak_mode else '🚰 Normal'} Usage: {usage} L")

        # Append the current usage to the history buffer
        water_usage_history.append(usage)

        # If we have enough data, use the model for anomaly detection
        if len(water_usage_history) == seq_length:
            # Prepare input: scale the history data
            input_array = np.array(water_usage_history).reshape(-1, 1)
            scaled_input = scaler.transform(input_array)
            scaled_input = scaled_input.reshape(1, seq_length, 1)

            # Predict the next water usage using the LSTM model
            predicted_usage = model.predict(scaled_input, verbose=0)[0][0]
            # Calculate the absolute prediction error
            error = abs(predicted_usage - usage)
            print(f"📊 Predicted: {predicted_usage:.2f}, Actual: {usage:.2f}, Error: {error:.2f}")

            # If error exceeds the set anomaly threshold, mark it as a leak anomaly
            if error > anomaly_threshold:
                print("⚠️  Model detected an anomaly (possible leak)!")
                high_usage_counter += 1
                leak_mode = True  # Optionally set leak_mode true based on model output
            else:
                high_usage_counter = 0
                leak_mode = False

        # Push the current reading to Firebase
        push_water_usage_to_firebase(usage)

        # Auto-shutoff logic: if anomaly detected for 5 consecutive intervals, trigger shutoff
        if high_usage_counter >= 5:
            print("⚠️  Anomaly detected for 5 consecutive intervals! Initiating auto-shutoff sequence...")
            for i in range(2):
                time.sleep(minute_duration)
                with state_lock:
                    if water_shutoff or not leak_mode:
                        print("✅ Leak resolved during waiting period!")
                        high_usage_counter = 0
                        break
                print(f"⏰ Waiting... ({i + 1}/2)")
            else:
                with state_lock:
                    if leak_mode and not water_shutoff:
                        water_shutoff = True
                        print("🔒 Auto-shutoff: Water stopped due to persistent anomaly!")
        time.sleep(minute_duration)

#########################################
# Listen for Action Updates from Firestore
#########################################

def listen_for_actions():
    """Listen for changes in the actions collection and update simulation state."""
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

    actions_ref = db.collection("users").document(get_user_id()).collection("actions")
    actions_ref.on_snapshot(on_snapshot)

#########################################
# Main Entry Point
#########################################

if __name__ == "__main__":
    # Start the socket server for receiving commands in a background thread
    threading.Thread(target=start_socket_server, daemon=True).start()
    # Start listening for Firestore actions in a background thread
    threading.Thread(target=listen_for_actions, daemon=True).start()
    # Run the water usage simulation (this runs in the main thread)
    simulate_water_usage()
