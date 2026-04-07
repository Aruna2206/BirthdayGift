import asyncio
import auth
from database import init_db
import models

async def seed_user():
    # Initialize the database connection
    await init_db()
    
    # Check if the user already exists
    user = await models.User.find_one(models.User.username == "mylove")
    
    if not user:
        hashed_password = auth.get_password_hash("forever")
        db_user = models.User(username="mylove", hashed_password=hashed_password)
        await db_user.insert()
        print("Admin user 'mylove' created with password 'forever' in MongoDB!")
    else:
        print("User already exists in MongoDB.")

if __name__ == "__main__":
    asyncio.run(seed_user())
