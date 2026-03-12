import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API = "https://lokanath-leader-board.onrender.com";

  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchLeaderboard();

    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API}/leaderboard/`);
      setPlayers(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
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
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const deletePlayer = async (id) => {
    try {
      await axios.delete(`${API}/leaderboard/delete/${id}`);
      fetchLeaderboard();
    } catch (error) {
      console.error("Delete error:", error);
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

  const maxScore =
    players.length > 0 ? Math.max(...players.map((p) => p.score)) : 100;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        {/* HEADER */}

        <div className="header">
          <h1>🏆 Leaderboard</h1>

          <div className="watermark">Developed by M.Lokanath | 23FH1A05B1</div>
        </div>

        {/* DARK MODE */}

        <div className="center">
          <button
            className="btn btn-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark Mode
          </button>
        </div>

        {/* PODIUM VIEW */}

        <h2 className="top-title">Top Players</h2>

        <div className="podium">
          {players.slice(0, 3).map((p, index) => (
            <div key={p.id} className={`podium-card place-${index + 1}`}>
              <div className="medal">{getMedal(p.rank)}</div>

              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.name}`}
                width="60"
                alt="avatar"
              />

              <h4>{p.name}</h4>
              <p>{p.score} pts</p>
            </div>
          ))}
        </div>

        {/* SEARCH */}

        <div className="search-box">
          <input
            className="form-control"
            placeholder="Search player..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ADD PLAYER FORM */}

        <div className="player-form">
          <input
            className="form-control"
            placeholder="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control"
            type="number"
            placeholder="Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <button className="btn btn-success" onClick={addPlayer}>
            Add Player
          </button>
        </div>

        {/* TABLE */}

        <div className="table-container">
          <table className="table table-dark table-bordered text-center">
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
                        className="progress-bar bg-info"
                        style={{
                          width: `${(p.score / maxScore) * 100}%`,
                        }}
                      />
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
        </div>
      </div>
    </div>
  );
}

export default App;
