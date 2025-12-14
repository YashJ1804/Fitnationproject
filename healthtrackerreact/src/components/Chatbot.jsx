import { useState } from "react";
import api from "../services/api";

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const res = await api.post("/chatbot", { message: msg });
    setReply(res.data.reply);
  };

  return (
    <div>
      <h3>Chatbot</h3>
      <input onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
      <p>{reply}</p>
    </div>
  );
}
