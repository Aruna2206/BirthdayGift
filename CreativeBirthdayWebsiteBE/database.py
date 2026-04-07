import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import models

load_dotenv()

async def init_db():
    # Load MongoDB URI from environment variable
    mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    
    client = AsyncIOMotorClient(mongodb_uri)
    # If no database name is in the URI path, use 'birthday_db' as default
    db_name = mongodb_uri.split('/')[-1].split('?')[0]
    if not db_name:
        database = client.birthday_db
    else:
        database = client.get_default_database()
    
    await init_beanie(
        database=database,
        document_models=[
            models.User,
            models.Image
        ]
    )
    print("Database connection successfully established with MongoDB!")
