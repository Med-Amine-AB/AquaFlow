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
import apartments_data from "../../data/houses_data.json";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Définir l'interface des données
interface Apartment {
  Type: string;
  Localisation: string;
  "Price in DH": number;
  "Area in m²": number;
}

// Charger les données JSON
const apartments: Apartment[] = apartments_data as Apartment[];

// Préparer les données pour le graphique
const typeCounts = apartments.reduce((acc: { [key: string]: number }, curr) => {
  acc[curr.Type] = (acc[curr.Type] || 0) + 1;
  return acc;
}, {});

const barChartData = {
  labels: Object.keys(typeCounts),
  datasets: [
    {
      label: "Nombre de Propriétés",
      data: Object.values(typeCounts),
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

// Définir les options du graphique
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Distribution des Types de Propriétés",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Type de Propriété",
      },
    },
    y: {
      title: {
        display: true,
        text: "Nombre de Propriétés",
      },
    },
  },
};

const DistributionProprietes: React.FC = () => {
  return (
    <div className="w-full p-4 shadow-lg rounded-md bg-white">
      <Bar data={barChartData} options={options} />
    </div>
  );
};

export default DistributionProprietes;
