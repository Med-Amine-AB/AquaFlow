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
  "Price in DH": number;
}

// Charger les données JSON
const apartments: Apartment[] = apartments_data as Apartment[];

// Préparer les données pour l'histogramme
const prices = apartments.map((apartment) => apartment["Price in DH"]);

// Fonction pour regrouper les prix en bins
const createBins = (data: number[], binCount: number) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binSize = (max - min) / binCount;

  const bins = Array(binCount).fill(0);
  data.forEach((value) => {
    const index = Math.min(Math.floor((value - min) / binSize), binCount - 1);
    bins[index]++;
  });

  const labels = Array(binCount)
    .fill(0)
    .map((_, i) => `${Math.round(min + i * binSize)} - ${Math.round(min + (i + 1) * binSize)}`);
  return { bins, labels };
};

// Créer les bins pour l'histogramme
const binCount = 10; // Nombre de catégories (bins)
const { bins, labels } = createBins(prices, binCount);

// Préparer les données pour Chart.js
const histogramData = {
  labels: labels,
  datasets: [
    {
      label: "Fréquence des Prix",
      data: bins,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
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
      text: "Distribution des Prix des Propriétés",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Tranches de Prix (DH)",
      },
    },
    y: {
      title: {
        display: true,
        text: "Fréquence",
      },
    },
  },
};

const HistogramPrices: React.FC = () => {
  return (
    <div className="w-full p-4 shadow-lg rounded-md bg-white">
      <Bar data={histogramData} options={options} />
    </div>
  );
};

export default HistogramPrices;
