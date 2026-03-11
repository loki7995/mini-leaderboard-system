import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/leaderboard")
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🏆 Leaderboard</h1>

      <table className="table table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>
                {player.rank === 1 && "🥇"}
                {player.rank === 2 && "🥈"}
                {player.rank === 3 && "🥉"}#{player.rank}
              </td>

              <td>
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${player.name}`}
                  alt="avatar"
                  width="35"
                  style={{ marginRight: "10px" }}
                />

                {player.name}
              </td>

              <td style={{ width: "200px" }}>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${player.score}%` }}
                  >
                    {player.score}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
