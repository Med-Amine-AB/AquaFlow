import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import cars_data from "../../data/cars_data.json";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Function to calculate the count of vehicles by état
const calculateEtatCounts = (data: any[]) => {
  const etatCounts: { [key: string]: number } = {};

  data.forEach((car) => {
    const etat = car.etat;
    if (!etatCounts[etat]) {
      etatCounts[etat] = 0;
    }
    etatCounts[etat]++;
  });

  return Object.entries(etatCounts);
};

const etatCounts = calculateEtatCounts(cars_data);

// Prepare Chart.js data
const data = {
  labels: etatCounts.map(([etat]) => etat),
  datasets: [
    {
      label: "Nombre de Véhicules",
      data: etatCounts.map(([, count]) => count),
      backgroundColor: "rgba(153, 102, 255, 0.5)",
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Répartition des Véhicules par État",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "État",
      },
    },
    y: {
      title: {
        display: true,
        text: "Nombre de Véhicules",
      },
      beginAtZero: true,
    },
  },
};

const VehicleEtatBarChart: React.FC = () => {
  return (
    <div className="w-full p-2 shadow-lg rounded-md bg-white">
      <Bar data={data} options={options} />
    </div>
  );
};

export default VehicleEtatBarChart;
