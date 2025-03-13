import React from "react";
import Plot from "react-plotly.js";
import cars_data from "../../data/cars_data.json";

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

// Extract car prices
const prices = cars.map((car) => car.prix);

// Group prices into bins
const createPriceBins = (data: number[], binSize: number) => {
  const maxPrice = Math.max(...data);
  const bins: number[] = Array(Math.ceil(maxPrice / binSize)).fill(0);

  data.forEach((price) => {
    const binIndex = Math.floor(price / binSize);
    bins[binIndex] += 1;
  });

  return bins;
};

const binSize = 10000;
let bins = createPriceBins(prices, binSize);
let labels = bins.map((_, index) => `${index * binSize}-${(index + 1) * binSize} MAD`);

// Remove leading bins with a frequency of 0
const startIndex = bins.findIndex((count) => count > 0);
bins = bins.slice(startIndex);
labels = labels.slice(startIndex);

const PriceDistribution: React.FC = () => {
  return (
    <div className="w-full p-2 shadow-lg rounded-md bg-white">
      <Plot
        data={[
          {
            x: labels,
            y: bins,
            type: "bar",
            marker: { color: "#3C50E0" },
          },
        ]}
        layout={{
          title: "Distribution des prix",
          xaxis: { title: "Prix (MAD)" },
          yaxis: { title: "Fréquence" },
          responsive: true,
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default PriceDistribution;
