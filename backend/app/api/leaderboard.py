from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.crud.player_crud import create_player, get_leaderboard
from app.utils.ranking import calculate_ranks

router = APIRouter(prefix="/leaderboard")


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/add")

def add_player(name: str, score: int,
               db: Session = Depends(get_db)):

    return create_player(db, name, score)


@router.get("/")

def leaderboard(db: Session = Depends(get_db)):

    players = get_leaderboard(db)

    return calculate_ranks(players)