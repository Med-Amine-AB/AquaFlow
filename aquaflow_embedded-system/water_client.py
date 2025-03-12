import socket

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