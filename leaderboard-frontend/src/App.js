import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // Backend API URL
  const API = "https://lokanath-leader-board.onrender.com";

  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API}/leaderboard/`);
      setPlayers(res.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  // Add player
  const addPlayer = async () => {
    if (!name || !score) return;

    try {
      await axios.post(`${API}/leaderboard/add`, null, {
        params: {
          name: name,
          score: score,
        },
      });

      setName("");
      setScore("");
      fetchLeaderboard();
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  // Delete player
  const deletePlayer = async (id) => {
    try {
      await axios.delete(`${API}/leaderboard/delete/${id}`);
      fetchLeaderboard();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Medal logic
  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  // Search filter
  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const maxScore =
    players.length > 0 ? Math.max(...players.map((p) => p.score)) : 100;

  return (
    <div
      className={
        darkMode ? "bg-dark text-white min-vh-100 p-4" : "min-vh-100 p-4"
      }
    >
      ```
      <div className="container">
        {/* HEADER WITH WATERMARK */}

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "0",
              fontSize: "14px",
              fontWeight: "600",
              opacity: "0.8",
              padding: "6px 10px",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "6px",
            }}
          >
            Developed by M Lokanath | 23FH1A05B1 Dr.K.V.SRIT college Student of
            CSE B
          </div>

          <h1 className="text-center mb-4">🏆 Leaderboard</h1>
        </div>

        {/* DARK MODE BUTTON */}

        <div className="text-center mb-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-secondary"
          >
            Toggle Dark Mode
          </button>
        </div>

        {/* PODIUM VIEW */}

        <div className="text-center mb-4">
          <h2>Top Players</h2>

          {players.slice(0, 3).map((p) => (
            <div key={p.id} style={{ margin: "8px" }}>
              <h3>
                {getMedal(p.rank)} {p.name} - {p.score}
              </h3>
            </div>
          ))}
        </div>

        {/* SEARCH BAR */}

        <div className="mb-3">
          <input
            placeholder="Search player..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
        </div>

        {/* ADD PLAYER FORM */}

        <div className="row mb-4">
          <div className="col">
            <input
              placeholder="Player Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col">
            <input
              type="number"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col">
            <button onClick={addPlayer} className="btn btn-success w-100">
              Add Player
            </button>
          </div>
        </div>

        {/* LEADERBOARD TABLE */}

        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Score</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPlayers.map((p) => (
              <tr key={p.id}>
                <td>{getMedal(p.rank)}</td>

                <td>
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.name}`}
                    width="40"
                    alt="avatar"
                  />
                </td>

                <td>{p.name}</td>

                <td>{p.score}</td>

                <td>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      style={{
                        width: `${(p.score / maxScore) * 100}%`,
                      }}
                    />
                  </div>
                </td>

                <td>
                  <button
                    onClick={() => deletePlayer(p.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
