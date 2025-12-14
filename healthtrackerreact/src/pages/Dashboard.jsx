import PieChart from "../components/PieChart";
import Leaderboard from "../components/Leaderboard";
import Chatbot from "../components/Chatbot";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <PieChart />
      <Leaderboard />
      <Chatbot />
    </div>
  );
}
