import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import cars_data from "../../data/cars_data.json";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Function to calculate fuel type distribution
const calculateFuelTypeDistribution = (data: any[]) => {
  const fuelTypeCounts: { [key: string]: number } = {};

  data.forEach((car) => {
    const fuelType = car.type_de_carburant;
    if (!fuelTypeCounts[fuelType]) {
      fuelTypeCounts[fuelType] = 0;
    }
    fuelTypeCounts[fuelType]++;
  });

  return fuelTypeCounts;
};

const fuelTypeDistribution = calculateFuelTypeDistribution(cars_data);

// Prepare data for Pie chart
const data = {
  labels: Object.keys(fuelTypeDistribution),
  datasets: [
    {
      data: Object.values(fuelTypeDistribution),
      backgroundColor: ["#FFB6C1", "#8A2BE2", "#FFD700", "#90EE90", "#00BFFF"], // Customize colors
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Répartition des Voitures par Type de Carburant",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: any) {
          return `${tooltipItem.label}: ${tooltipItem.raw} voitures`;
        },
      },
    },
  },
};

const FuelTypePieChart: React.FC = () => {
  return (
    <div className="w-full p-2 shadow-lg rounded-md bg-white row-span-2">
      <Pie data={data} options={options} />
    </div>
  );
};

export default FuelTypePieChart;
