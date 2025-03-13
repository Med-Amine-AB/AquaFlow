import React from "react";
import Plot from "react-plotly.js";
import data from "../../data/cars_data.json";

const FuelTypeBoxplot = () => {
  // Extract `type_de_carburant` and `prix`
  const groupedData = data.reduce((acc, curr) => {
    const fuelType = curr["type_de_carburant"];
    if (!acc[fuelType]) acc[fuelType] = [];
    acc[fuelType].push(curr.prix);
    return acc;
  }, {});

  const fuelTypes = Object.keys(groupedData);
  const prices = Object.values(groupedData);

  return (
    <div className="w-full h-full">
      <Plot
        data={fuelTypes.map((fuelType, index) => ({
          y: prices[index],
          type: "box",
          name: fuelType,
          marker: { color: "rgba(31, 119, 180, 0.7)" }, // Muted palette
          boxmean: true, // Add mean line
        }))}
        layout={{
          title: "Distribution des Prix selon le Type de Carburant",
          xaxis: { title: "Type de Carburant" },
          yaxis: { title: "Prix" },
          autosize: true,
          height: 600, // Adjust height as needed
        }}
        useResizeHandler={true} // Enable responsiveness
        style={{ width: "100%", height: "100%" }} // Full width and height
      />
    </div>
  );
};

export default FuelTypeBoxplot;
