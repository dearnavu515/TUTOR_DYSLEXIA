import pymongo

# Connect to your MongoDB (Running on your computer)
client = pymongo.MongoClient("mongodb://localhost:27017/")

# This creates a database named 'tutor_db'
db = client['tutor_db']