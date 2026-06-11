from fastapi import FastAPI

from app.schemas.review import ReviewRequest
from app.services.ai_reviewer import review_code_with_ai

from app.database.db import SessionLocal, engine
from app.database.models import Review, Base

app = FastAPI(
    title="AI Code Review Assistant"
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

    print("SAVED REVIEW ID:", review_record.id)

    db.close()

    return {
        "id": review_record.id,
        "language": request.language,
        "review": ai_review
    }