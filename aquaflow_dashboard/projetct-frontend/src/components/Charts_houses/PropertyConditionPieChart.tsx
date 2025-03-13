import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import apartments_data from "../../data/houses_data.json";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Définir l'interface des données
interface Apartment {
  Condition: string;
}

// Charger les données JSON
const apartments: Apartment[] = apartments_data as Apartment[];

// Compter les occurrences de chaque condition
const conditionCounts = apartments.reduce((acc: { [key: string]: number }, curr) => {
  acc[curr.Condition] = (acc[curr.Condition] || 0) + 1;
  return acc;
}, {});

// Préparer les données pour le diagramme
const pieChartData = {
  labels: Object.keys(conditionCounts),
  datasets: [
    {
      label: "Proportion des Conditions",
      data: Object.values(conditionCounts),
      backgroundColor: [
        "rgba(75, 192, 192, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Options du graphique
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Proportion des Conditions des Propriétés",
    },
  },
};

const PropertyConditionPieChart: React.FC = () => {
  return (
    <div className="w-full p-4 shadow-lg rounded-md bg-white row-span-2">
      <Pie data={pieChartData} options={options} />
    </div>
  );
};

export default PropertyConditionPieChart;
