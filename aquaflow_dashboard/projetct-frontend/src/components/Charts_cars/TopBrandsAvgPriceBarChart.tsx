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

// Function to calculate top 10 brands by average price
const calculateTopBrandsAvgPrice = (data: any[]) => {
  const brandPriceTotals: { [key: string]: { total: number; count: number } } = {};

  data.forEach((car) => {
    const { marque, prix } = car;
    if (!brandPriceTotals[marque]) {
      brandPriceTotals[marque] = { total: 0, count: 0 };
    }
    brandPriceTotals[marque].total += prix;
    brandPriceTotals[marque].count++;
  });

  const brandAvgPrices = Object.entries(brandPriceTotals).map(([brand, { total, count }]) => [
    brand,
    total / count,
  ]);

  // Sort by average price and return the top 10
  return brandAvgPrices
    .sort(([, avgPriceA], [, avgPriceB]) => avgPriceB - avgPriceA)
    .slice(0, 10);
};

const topBrandsAvgPrice = calculateTopBrandsAvgPrice(cars_data);

// Prepare Chart.js data
const data = {
  labels: topBrandsAvgPrice.map(([brand]) => brand),
  datasets: [
    {
      label: "Prix Moyen",
      data: topBrandsAvgPrice.map(([, avgPrice]) => avgPrice),
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Prix Moyen par les 10 Principales Marques",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: any) {
          return `Prix Moyen: ${tooltipItem.raw.toFixed(2)} €`;
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
        text: "Prix Moyen (€)",
      },
      beginAtZero: true,
    },
  },
};

const TopBrandsAvgPriceBarChart: React.FC = () => {
  return (
    <div className="w-full p-2 shadow-lg rounded-md bg-white">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopBrandsAvgPriceBarChart;
