import threading
import time
import random
import socket

# Global simulation state
leak_mode = False
water_shutoff = False
high_usage_counter = 0
threshold = 1.5
minute_duration = 5  # 1 second = 1 simulated minute
state_lock = threading.Lock()

# Socket setup for receiving commands
HOST = '127.0.0.1'
PORT = 65432


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

        # Display with emojis
        if water_shutoff:
            print("🔒 Water is shut off! Usage: 0.0 L")
        else:
            print(f"{'💧 LEAK! ' if leak_mode else '🚰 Normal'} Usage: {usage} L")

        # Check for high usage
        with state_lock:
            if not water_shutoff and usage > threshold:
                high_usage_counter += 1
            else:
                high_usage_counter = 0

        # Leak detection logic
        if high_usage_counter >= 5:
            print("⚠️  Leak detected! Waiting 2 minutes for response...")
            for _ in range(2):
                time.sleep(minute_duration)
                with state_lock:
                    if water_shutoff or not leak_mode:
                        print("✅  Leak resolved!")
                        high_usage_counter = 0
                        break
                print(f"⏰  Waiting... ({_ + 1}/2)")
            else:
                with state_lock:
                    if leak_mode and not water_shutoff:
                        water_shutoff = True
                        print("🔒  Auto-shutoff: Water stopped!")

        time.sleep(minute_duration)


if __name__ == "__main__":
    # Start threads
    threading.Thread(target=start_socket_server, daemon=True).start()
    simulate_water_usage()