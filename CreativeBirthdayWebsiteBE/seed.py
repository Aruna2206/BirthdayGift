import os
from database import engine, SessionLocal
import models

# Make sure tables exist
models.Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    
    # Check if there are any images, if so skip seeding
    if db.query(models.Image).first() is not None:
        print("Database already seeded with images.")
        db.close()
        return

    # Let's add some dummy images for the gallery and home
    images_to_seed = [
        {"title": "Memories 1", "description": "A wonderful memory together.", "url": "/static/gallery1.jpg", "page": "gallery"},
        {"title": "Memories 2", "description": "Another great moment.", "url": "/static/gallery2.jpg", "page": "gallery"},
        {"title": "Home Hero", "description": "The main hero image for the home page.", "url": "/static/home1.jpg", "page": "home"},
    ]
    
    for img_data in images_to_seed:
        img = models.Image(**img_data)
        db.add(img)
        
    db.commit()
    print("Database seeded successfully with dummy image URLs.")
    db.close()

if __name__ == "__main__":
    seed_db()
