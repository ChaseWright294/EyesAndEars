import sqlite3
import re

# Setup
conn = sqlite3.connect(":memory:")  # Use in-memory DB for demo
cursor = conn.cursor()
cursor.execute("CREATE TABLE users (username TEXT, password TEXT)")
cursor.execute("INSERT INTO users VALUES ('admin', 'admin123')")
conn.commit()

# Simulate vulnerable login
print("Input username and password")
username = input("Username: ")
password = input("Password: ")

#INSERT INPUT VALIDATION CODE HERE
# Simple validation: no special SQL characters
def is_valid_input(username, password):
    return re.match("^[a-zA-Z0-9_]+$", username) and re.match("^[a-zA-Z0-9_]+$", password)

#Checking input validity
if not is_valid_input(username, password):
    print("❌ Invalid input: Only letters, numbers, and underscores allowed.")
    exit(0)

# UNSAFE: Vulnerable to SQL Injection
query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
print(f"\n[DEBUG] Executing: {query}")
cursor.execute(query)
result = cursor.fetchone()

if result:
    print("✅ Login successful!")
else:
    print("❌ Login failed.")