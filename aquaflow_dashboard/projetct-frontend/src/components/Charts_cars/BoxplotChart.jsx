import React from "react";
import Plot from "react-plotly.js";
import data from "../../data/cars_data.json";

const BoxplotChart = () => {
  // Extract `annee-modele` and `prix`
  const groupedData = data.reduce((acc, curr) => {
    const year = curr["annee-modele"];
    if (!acc[year]) acc[year] = [];
    acc[year].push(curr.prix);
    return acc;
  }, {});

  const years = Object.keys(groupedData);
  const prices = Object.values(groupedData);

  return (
    <div className="w-full h-full col-span-2">
      <Plot
        data={years.map((year, index) => ({
          y: prices[index],
          type: "box",
          name: year.toString(),
        }))}
        layout={{
          title: "Année-Modele vs Prix",
          xaxis: { title: "Année-Modele" },
          yaxis: { title: "Prix" },
          autosize: true,
          width: null, // Allow dynamic resizing
          height: 600, // Adjust height as needed
        }}
        useResizeHandler={true} // Enable responsiveness
        style={{ width: "100%", height: "100%" }} // Make the chart responsive
      />
    </div>
  );
};

export default BoxplotChart;
