import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import apartments_data from "../../data/houses_data.json";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

// Définir l'interface des données
interface Apartment {
  Latitude: number;
  Longitude: number;
  "Price in DH": number;
}

// Charger les données JSON
const apartments: Apartment[] = apartments_data as Apartment[];

// Préparer les données pour le graphique
const scatterData = {
  datasets: [
    {
      label: "Propriétés",
      data: apartments.map((apartment) => ({
        x: apartment.Longitude,
        y: apartment.Latitude,
        r: Math.log(apartment["Price in DH"]) * 3, // Rayon basé sur le prix (échelle logarithmique)
      })),
      backgroundColor: apartments.map(
        (apartment) =>
          `rgba(${Math.min(255, apartment["Price in DH"] / 100)}, 100, 150, 0.6)`
      ),
      borderColor: "rgba(0, 0, 0, 0.1)",
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
      text: "Distribution des Propriétés par Localisation et Prix",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Longitude",
      },
    },
    y: {
      title: {
        display: true,
        text: "Latitude",
      },
    },
  },
};

const GeospatialPlot: React.FC = () => {
  return (
    <div className="w-full p-4 shadow-lg rounded-md bg-white">
      <Scatter data={scatterData} options={options} />
    </div>
  );
};

export default GeospatialPlot;
