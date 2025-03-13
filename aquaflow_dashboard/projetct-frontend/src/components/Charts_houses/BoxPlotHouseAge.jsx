import React from "react";
import Plot from "react-plotly.js";
import apartments_data from "../../data/houses_data.json";

const BoxPlotHouseAge = () => {
  // Préparer les données
  const houseAges = apartments_data.map((item) => item["House Age in ans"]);
  const prices = apartments_data.map((item) => item["Price in DH"]);

  return (
    <Plot
      data={[
        {
          x: houseAges,
          y: prices,
          type: "box",
          boxpoints: "all", // Ajoute des points individuels au boxplot
          jitter: 0.3, // Éloignement des points
          pointpos: -1.8, // Position des points
          marker: { color: "blue" },
          name: "Price Distribution by House Age",
        },
      ]}
      layout={{
        title: "Price Distribution by House Age",
        xaxis: {
          title: "House Age (in years)",
          tickangle: 45,
        },
        yaxis: {
          title: "Price in DH",
        },
        autosize: true,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default BoxPlotHouseAge;
