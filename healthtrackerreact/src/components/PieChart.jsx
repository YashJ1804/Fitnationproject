import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function PieChart() {
  const data = {
    labels: ["Cardio", "Strength", "Yoga"],
    datasets: [
      {
        data: [40, 35, 25],
      },
    ],
  };

  return <Pie data={data} />;
}
