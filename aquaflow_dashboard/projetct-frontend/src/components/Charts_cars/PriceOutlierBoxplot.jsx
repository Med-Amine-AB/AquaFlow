import React from "react";
import Plot from "react-plotly.js";
import data from "../../data/cars_data.json";

const PriceOutlierBoxplot = () => {
  // Extract only the `prix` values
  const prices = data.map((item) => item.prix);

  return (
    <div className="w-full h-full col-span-2">
      <Plot
        data={[
          {
            x: prices, // Use x-axis for horizontal box plot
            type: "box",
            name: "Prix",
            marker: { color: "rgba(31, 119, 180, 0.7)" }, // Muted color palette
            boxmean: true, // Add mean line
            orientation: "h", // Horizontal box plot
          },
        ]}
        layout={{
          title: "Détection des Valeurs Abérantes pour le Prix",
          xaxis: { title: "Prix" },
          yaxis: { visible: false }, // Hide y-axis since it's not needed
          autosize: true,
          height: 400, // Adjust height as needed
        }}
        useResizeHandler={true} // Enable responsiveness
        style={{ width: "100%", height: "100%" }} // Full width and height
      />
    </div>
  );
};

export default PriceOutlierBoxplot;
