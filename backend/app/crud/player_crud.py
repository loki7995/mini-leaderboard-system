from sqlalchemy.orm import Session
from app.models.player import Player


def create_player(db: Session, name, score):

    player = Player(
        name=name,
        score=score
    )

    db.add(player)
    db.commit()
    db.refresh(player)

    return player


def get_leaderboard(db: Session):

    return db.query(Player).order_by(
        Player.score.desc()
    ).all()