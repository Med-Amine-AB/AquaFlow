import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import cars_data from "../../data/cars_data.json";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define the interface for car objects
interface Car {
  marque: string;
  modele: string;
  annee_modele: number;
  kilometrage: number;
  type_de_carburant: string;
  puissance_fiscale: number;
  boite_de_vitesses: string;
  nombre_de_portes: number;
  origine: string;
  premiere_main: number;
  etat: string;
  airbags: number;
  climatisation: number;
  abs: number;
  esp: number;
  cd_mp3_bluetooth: number;
  prix: number;
}

// Cast JSON data to the correct type
const cars: Car[] = cars_data as Car[];

// Group data by 'kilometrage' and calculate mean price
const groupByKilometrage = (data: Car[]) => {
  const grouped: { [kilometrage: number]: number[] } = {};

  data.forEach((car) => {
    if (!grouped[car.kilometrage]) {
      grouped[car.kilometrage] = [];
    }
    grouped[car.kilometrage].push(car.prix);
  });

  const averages = Object.entries(grouped).map(([kilometrage, prices]) => ({
    kilometrage: Number(kilometrage),
    prix: prices.reduce((sum, price) => sum + price, 0) / prices.length,
  }));

  return averages.sort((a, b) => a.kilometrage - b.kilometrage); // Sort by kilometrage
};

const averagedData = groupByKilometrage(cars);

// Prepare data for Chart.js
const data = {
  labels: averagedData.map((item) => item.kilometrage),
  datasets: [
    {
      label: "Prix moyen",
      data: averagedData.map((item) => item.prix),
      borderColor: "green",
      backgroundColor: "rgba(0, 128, 0, 0.2)",
      pointBorderColor: "green",
      pointBackgroundColor: "green",
      pointRadius: 5,
      fill: true,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Kilométrage vs Prix (moyennes)",
      font: { size: 18 },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Kilométrage",
      },
    },
    y: {
      title: {
        display: true,
        text: "Prix moyen",
      },
    },
  },
};

const KilometrageVsPrix: React.FC = () => {
  return (
    <div className="w-full p-2 shadow-lg rounded-md bg-white">
      <Line data={data} options={options} />
    </div>
  );
};

export default KilometrageVsPrix;
