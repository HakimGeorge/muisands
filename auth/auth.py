import json
from flask import Flask, request, jsonify

app = Flask(__name__)

USERS_FILE = 'users.json'

def load_users():
    try:
        with open(USERS_FILE, 'r') as file:
            users_data = json.load(file)
    except FileNotFoundError:
        users_data = []
    return users_data

def save_users(users_data):
    with open(USERS_FILE, 'w') as file:
        json.dump(users_data, file)

@app.route('/register', methods=['POST'])
def register():
    users_data = load_users()

    username = request.json.get('username')
    password = request.json.get('password')

    if not username or not password:
        return jsonify({'error': 'Invalid request. Username and password are required.'}), 400

    # Check if username already exists
    for user in users_data:
        if user['username'] == username:
            return jsonify({'error': 'Username already exists. Please choose a different username.'}), 400

    # Add new user to users_data
    new_user = {'username': username, 'password': password}
    users_data.append(new_user)

    # Save updated users_data to file
    save_users(users_data)

    return jsonify({'message': 'Registration successful'})

@app.route('/login', methods=['POST'])
def login():
    users_data = load_users()

    username = request.json.get('username')
    password = request.json.get('password')

    if not username or not password:
        return jsonify({'error': 'Invalid request. Username and password are required.'}), 400

    # Find user by username
    for user in users_data:
        if user['username'] == username:
            if user['password'] == password:
                return jsonify({'token': 'your_generated_token'})
            else:
                return jsonify({'error': 'Invalid credentials. Please try again.'}), 401

    return jsonify({'error': 'User not found. Please register an account.'}), 404

if __name__ == '__main__':
    app.run()
