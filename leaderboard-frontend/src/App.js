import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/leaderboard");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="container mt-5">
      ```
      <h1 className="text-center mb-4">🏆 Leaderboard</h1>
      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{getMedal(player.rank)}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Watermark */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "20px",
          opacity: "0.6",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        This project is developed by Lokanath
      </div>
    </div>
  );
}

export default App;
