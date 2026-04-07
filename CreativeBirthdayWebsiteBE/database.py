from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import models

async def init_db():
    # Use the connection string provided by the user
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    database = client.birthday_db  # We'll call the database 'birthday_db'
    
    await init_beanie(
        database=database,
        document_models=[
            models.User,
            models.Image
        ]
    )
    print("Database connection successfully established with MongoDB!")
