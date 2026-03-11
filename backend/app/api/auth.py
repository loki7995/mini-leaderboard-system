from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.crud.user_crud import create_user

router = APIRouter(prefix="/auth")


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/register")

def register(username: str, email: str, password: str,
             db: Session = Depends(get_db)):

    return create_user(db, username, email, password)