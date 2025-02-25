import requests

# URL of the favorites API (doesn't respond to .env file to reduce dependencies 
# since I'm unfamiliar with python, but you could probably find the dotenv library for python)
URL = "http://localhost:3000/api/favorites"

# Function to add a favorite item
def add_favorite(user_id, favorite_item):
    data = {
        "userID": user_id,
        "favorite": favorite_item
    }
    response = requests.post(URL, json=data)
    
    if response.status_code == 200:
        print(response.text)
    else:
        print(response.text)

# Function to retrieve all favorites for a user
def get_favorites(user_id):
    response = requests.get(f"{URL}/{user_id}")
    
    if response.status_code == 200:
        data = response.json()
        favorites = data.get("favorites")

        if favorites:
            print(f"Favorites for user {user_id}:")
            for favorite in favorites:
                print(f" - {favorite}")
        else:
            print(f"User {user_id} has no favorites.")

    else:
        print(response.text)

# Function to remove a favorite item
def remove_favorite(user_id, favorite_item):
    data = {
        "userID": user_id,
        "favorite": favorite_item
    }
    response = requests.delete(URL, json=data)
    
    if response.status_code == 200:
        print(response.text)
    else:
        print(response.text)

# Example Usage
user_id = "1"
favorite_item = "Minecraft"

print("\nAdding a favorite item...")
add_favorite(user_id, "Mario Kart")

print("\nAdding a favorite item...")
add_favorite(user_id, "Mario Kart")

print("\nAdding a favorite item...")
add_favorite(user_id, "Mario Kart")

print("\nAdding a favorite item...")
add_favorite(user_id, "Tetris")

print("\nAdding a favorite item...")
add_favorite(user_id, favorite_item)

print("\nRetrieving favorite items...")
get_favorites(user_id)

print("\nRemoving the favorite item...")
remove_favorite(user_id, favorite_item)

print("\nRemoving the favorite item...")
remove_favorite(user_id, favorite_item)

print("\nRetrieving favorite items after removal...")
get_favorites(user_id)
