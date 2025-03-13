import React from "react";
import Plot from "react-plotly.js";
import cars_data from "../../data/cars_data.json";

// Define the interface for car objects
interface Car {
  marque: string;
  modele: string;
  annee_modele: number;
  kilometrage: number;
  prix: number;
}

// Cast JSON data to the correct type
const cars: Car[] = cars_data as Car[];

// Function to group data by "annee-modele" and calculate box plot statistics
const calculateBoxPlotData = (data: Car[]) => {
  const grouped: { [annee: number]: number[] } = {};

  data.forEach((car) => {
    if (!grouped[car.annee_modele]) {
      grouped[car.annee_modele] = [];
    }
    grouped[car.annee_modele].push(car.prix);
  });

  return Object.entries(grouped).map(([annee, prices]) => {
    prices.sort((a, b) => a - b);

    const min = prices[0];
    const max = prices[prices.length - 1];
    const median = prices[Math.floor(prices.length / 2)];
    const q1 = prices[Math.floor(prices.length / 4)];
    const q3 = prices[Math.floor((3 * prices.length) / 4)];

    return { annee: Number(annee), min, q1, median, q3, max };
  });
};

const boxPlotData = calculateBoxPlotData(cars);

// Extract traces for the box plot
const traces = boxPlotData.map((item) => ({
  type: "box",
  name: item.annee.toString(),
  y: [item.min, item.q1, item.median, item.q3, item.max],
  boxpoints: false, // Disable individual points
  marker: { color: "rgba(55, 128, 191, 0.7)" },
  line: { width: 1 },
}));

const AnneeModeleVsPrix: React.FC = () => {
  return (
    <div className="w-full p-2 shadow-lg rounded-md bg-white">
      <Plot
        data={traces}
        layout={{
          title: "Année-Modele vs Prix (Box Plot)",
          xaxis: {
            title: "Année-Modele",
            tickangle: 45,
          },
          yaxis: {
            title: "Prix",
          },
          boxmode: "group", // Group boxes by x-axis labels
          responsive: true,
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default AnneeModeleVsPrix;
