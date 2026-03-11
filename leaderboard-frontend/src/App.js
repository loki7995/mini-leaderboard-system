import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API = "https://lokanath-leader-board.onrender.com";

  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API}/leaderboard/`);
      setPlayers(res.data);
    } catch (err) {
      console.error("Error loading leaderboard", err);
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
      console.error("Error adding player", err);
    }
  };

  const deletePlayer = async (id) => {
    try {
      await axios.delete(`${API}/leaderboard/delete/${id}`);
      fetchLeaderboard();
    } catch (err) {
      console.error("Delete error", err);
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
    <div className="container mt-5">
      ```
      <h1 className="text-center mb-4">🏆 Leaderboard</h1>
      <div className="mb-3">
        <input
          placeholder="Search player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
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
