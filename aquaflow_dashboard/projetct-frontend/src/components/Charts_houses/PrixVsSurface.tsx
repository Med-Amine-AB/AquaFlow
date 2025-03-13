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
  Type: string;
  Localisation: string;
  Latitude: number;
  Longitude: number;
  Title: string;
  "Price in DH": number;
  "Area in m²": number;
  Rooms: number;
  Bedrooms: number;
  Bathrooms: number;
  Floor: number;
}

// Charger les données JSON
const apartments: Apartment[] = apartments_data as Apartment[];

// Préparer les données pour Chart.js
const scatterData = {
  datasets: [
    {
      label: "Appartements",
      data: apartments.map((apartment) => ({
        x: apartment["Area in m²"],
        y: apartment["Price in DH"],
      })),
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
      text: "Prix vs Surface (Appartements)",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Surface (m²)",
      },
    },
    y: {
      title: {
        display: true,
        text: "Prix (DH)",
      },
    },
  },
};

const PrixVsSurface: React.FC = () => {
  return (
    <div className="w-full p-4 shadow-lg rounded-md bg-white">
      <Scatter data={scatterData} options={options} />
    </div>
  );
};

export default PrixVsSurface;
