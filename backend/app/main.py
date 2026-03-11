from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import leaderboard, auth
from app.db.database import engine
from app.db.base import Base

import app.models.player
import app.models.user

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Leaderboard System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(leaderboard.router)

@app.get("/")
def root():
    return {"message": "Leaderboard API Running"}