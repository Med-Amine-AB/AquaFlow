import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import cars_data from "../../data/cars_data.json";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Function to calculate top 10 brands by count
const calculateTopBrands = (data: any[]) => {
  const brandCounts: { [key: string]: number } = {};

  data.forEach((car) => {
    const brand = car.marque;
    if (!brandCounts[brand]) {
      brandCounts[brand] = 0;
    }
    brandCounts[brand]++;
  });

  // Sort the brands by count and return the top 10
  const sortedBrands = Object.entries(brandCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10);

  return sortedBrands;
};

const topBrands = calculateTopBrands(cars_data);

// Prepare Chart.js data
const data = {
  labels: topBrands.map(([brand]) => brand),
  datasets: [
    {
      label: "Top 10 Marques",
      data: topBrands.map(([, count]) => count),
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Top 10 des Marques par Nombre de Véhicules",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: any) {
          return `Count: ${tooltipItem.raw}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Marque",
      },
    },
    y: {
      title: {
        display: true,
        text: "Count",
      },
      beginAtZero: true,
    },
  },
};

const TopBrandsBarChart: React.FC = () => {
  return (
    <div className="w-full p-2 shadow-lg rounded-md bg-white">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopBrandsBarChart;
