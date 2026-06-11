from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.review import ReviewRequest
from app.services.ai_reviewer import review_code_with_ai

from app.database.db import SessionLocal, engine
from app.database.models import Review, Base

app = FastAPI(
    title="AI Code Review Assistant"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {
        "message": "AI Code Review Assistant API Running"
    }


@app.post("/review")
def review_code(request: ReviewRequest):

    ai_review = review_code_with_ai(
        request.language,
        request.code
    )

    db = SessionLocal()

    review_record = Review(
        language=request.language,
        code=request.code,
        review=ai_review
    )

    db.add(review_record)
    db.commit()
    db.refresh(review_record)


    print("SAVED REVIEW ID:", review_record.id)

    db.close()

    return {
        "id": review_record.id,
        "language": request.language,
        "review": ai_review
    }
@app.get("/reviews")
def get_reviews():

    db = SessionLocal()

    reviews = db.query(Review).order_by(
        Review.created_at.desc()
    ).all()

    db.close()

    return reviews

@app.delete("/reviews")
def delete_reviews():

    db = SessionLocal()

    db.query(Review).delete()

    db.commit()

    db.close()

    return {
        "message": "All reviews deleted"
    }