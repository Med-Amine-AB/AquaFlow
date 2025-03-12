import curses
import threading
import time
import random

# Global simulation state
leak_mode = False  # When True, simulate a leak (high water usage)
water_shutoff = False  # When True, water is turned off
high_usage_counter = 0  # Counts consecutive minutes of high usage
threshold = 1.5  # Usage (liters) above which we consider it high

# Set simulated minute duration (60 seconds for real-time, change to 1 for testing)
minute_duration = 1

# Lock for thread-safe access
state_lock = threading.Lock()


def water_simulation(win_usage):
    global leak_mode, water_shutoff, high_usage_counter
    row = 0  # Start row for printing in usage window
    while True:
        with state_lock:
            if water_shutoff:
                usage = 0.0
            else:
                usage = round(random.uniform(2.0, 3.0), 2) if leak_mode else round(random.uniform(0.4, 1.0), 2)

        # Display water usage with timestamp
        timestamp = time.strftime('%H:%M:%S')
        win_usage.addstr(row, 0, f"{timestamp} 🚰 Usage: {usage} L{' ' * 10}")
        win_usage.refresh()
        row += 1
        if row >= (win_usage.getmaxyx()[0] - 1):  # reset when window is full
            win_usage.clear()
            row = 0

        # Check usage and count high usage minutes
        with state_lock:
            if not water_shutoff and usage > threshold:
                high_usage_counter += 1
            else:
                high_usage_counter = 0

        # If high usage persists for 5 minutes, start the shutoff procedure.
        if high_usage_counter >= 5:
            win_usage.addstr(row, 0, "⚠️  Leak detected! Waiting 2 minutes for user response...    ")
            win_usage.refresh()
            for i in range(2):
                time.sleep(minute_duration)
                with state_lock:
                    if water_shutoff or not leak_mode:
                        win_usage.addstr(row + 1, 0, "✅  Leak resolved during waiting period.           ")
                        high_usage_counter = 0
                        break
                win_usage.addstr(row + 1, 0, f"⏰  Waiting... ({i + 1}/2)           ")
                win_usage.refresh()
            else:
                with state_lock:
                    if leak_mode and not water_shutoff:
                        water_shutoff = True
                        win_usage.addstr(row + 2, 0, "🔒  No response. Water has been automatically shut off!")
                        win_usage.refresh()
        time.sleep(minute_duration)


def command_listener(stdscr):
    global leak_mode, water_shutoff, high_usage_counter
    height, width = stdscr.getmaxyx()
    # Create a window for command input at the bottom (3 lines tall)
    input_win = curses.newwin(3, width, height - 3, 0)
    input_win.timeout(100)  # non-blocking getch
    while True:
        input_win.clear()
        input_win.addstr(0, 0, "💻 Enter command ('make a leak', 'stop leak', 'stop water', 'start water', 'status'):")
        input_win.refresh()
        curses.echo()
        # Get user input (blocking call)
        cmd = input_win.getstr(1, 0).decode("utf-8").strip().lower()
        curses.noecho()
        with state_lock:
            if cmd == "make a leak":
                leak_mode = True
                input_win.addstr(2, 0, "💥 Leak simulation activated!")
            elif cmd == "stop leak":
                leak_mode = False
                high_usage_counter = 0
                input_win.addstr(2, 0, "👍 Leak simulation deactivated!")
            elif cmd == "stop water":
                water_shutoff = True
                input_win.addstr(2, 0, "🔒 Water manually shut off!")
            elif cmd == "start water":
                water_shutoff = False
                high_usage_counter = 0
                input_win.addstr(2, 0, "🚰 Water resumed!")
            elif cmd == "status":
                status = f"Leak mode: {leak_mode} | Water shutoff: {water_shutoff} | High usage counter: {high_usage_counter}"
                input_win.addstr(2, 0, status)
            else:
                input_win.addstr(2, 0, "❓ Unknown command.")
            input_win.refresh()
            time.sleep(1)


def main(stdscr):
    curses.curs_set(0)  # Hide cursor
    height, width = stdscr.getmaxyx()
    # Create a window for water usage logs (rest of screen above the input window)
    usage_win = curses.newwin(height - 3, width, 0, 0)
    usage_win.box()

    # Start simulation in a separate thread
    simulation_thread = threading.Thread(target=water_simulation, args=(usage_win,), daemon=True)
    simulation_thread.start()

    # Start command listener (runs in the main thread with its own window)
    command_listener(stdscr)


if __name__ == "__main__":
    curses.wrapper(main)
