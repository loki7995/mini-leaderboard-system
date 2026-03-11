from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.crud.player_crud import create_player, get_leaderboard
from app.models.player import Player
from app.utils.ranking import calculate_ranks

router = APIRouter(prefix="/leaderboard")

# Database Dependency

def get_db():
db = SessionLocal()
try:
yield db
finally:
db.close()

# Add Player

@router.post("/add")
def add_player(name: str, score: int, db: Session = Depends(get_db)):
return create_player(db, name, score)

# Get Leaderboard

@router.get("/")
def leaderboard(db: Session = Depends(get_db)):
players = get_leaderboard(db)
return calculate_ranks(players)

# Get Single Player

@router.get("/player/{player_id}")
def get_player(player_id: int, db: Session = Depends(get_db)):
player = db.query(Player).filter(Player.id == player_id).first()


if not player:
    raise HTTPException(status_code=404, detail="Player not found")

return player


# Delete Player

@router.delete("/delete/{player_id}")
def delete_player(player_id: int, db: Session = Depends(get_db)):
player = db.query(Player).filter(Player.id == player_id).first()


if not player:
    raise HTTPException(status_code=404, detail="Player not found")

db.delete(player)
db.commit()

return {"message": "Player deleted successfully"}

