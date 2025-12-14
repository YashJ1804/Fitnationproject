import { useEffect, useState } from "react";
import api from "../services/api";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/rank").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h3>Leaderboard</h3>
      {users.map((u, i) => (
        <p key={u._id}>
          {i + 1}. {u.name} — {u.points}
        </p>
      ))}
    </div>
  );
}
