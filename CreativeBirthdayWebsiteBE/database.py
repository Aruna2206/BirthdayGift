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
    # Load database name from env, default to 'mylove' as requested
    db_name = os.getenv("DB_NAME", "mylove")
    database = client[db_name]
    
    await init_beanie(
        database=database,
        document_models=[
            models.User,
            models.Image
        ]
    )
    print("Database connection successfully established with MongoDB!")
