import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API = "https://lokanath-leader-board.onrender.com";

  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchLeaderboard();

    ```
const interval = setInterval(() => {
  fetchLeaderboard();
}, 5000);

return () => clearInterval(interval);
```;
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API}/leaderboard`);
      setPlayers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

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
    } catch (err) {
      console.error(err);
    }
  };

  const deletePlayer = async (id) => {
    try {
      await axios.delete(`${API}/leaderboard/delete/${id}`);
      fetchLeaderboard();
    } catch (err) {
      console.error(err);
    }
  };

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const maxScore = Math.max(...players.map((p) => p.score), 100);

  const podium = players.slice(0, 3);

  return (
    <div className={darkMode ? "dark app-container" : "app-container"}>
      {" "}
      <h1 className="title">🏆 Leaderboard</h1>
      ```
      <button
        className="btn btn-secondary mb-3"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="podium">
        {podium.map((p) => (
          <div key={p.id} className="podium-card">
            <h3>{getMedal(p.rank)}</h3>
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.name}`}
              alt="avatar"
              width="60"
            />
            <p>{p.name}</p>
            <strong>{p.score}</strong>
          </div>
        ))}
      </div>
      <div className="controls">
        <input
          placeholder="Search player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={fetchLeaderboard} className="btn btn-primary">
          🔄 Refresh
        </button>
      </div>
      <div className="add-form">
        <input
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Score"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <button onClick={addPlayer} className="btn btn-success">
          Add Player
        </button>
      </div>
      {loading ? (
        <h2 className="loading">Loading leaderboard...</h2>
      ) : (
        <table className="table leaderboard-table">
          <thead>
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
                      className="progress-bar"
                      style={{
                        width: `${(p.score / maxScore) * 100}%`,
                      }}
                    ></div>
                  </div>
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePlayer(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h4 className="total">Total Players: {players.length}</h4>
      <footer className="footer">
        © 2026 Lokanath | Full Stack Leaderboard System
      </footer>
    </div>
  );
}

export default App;
