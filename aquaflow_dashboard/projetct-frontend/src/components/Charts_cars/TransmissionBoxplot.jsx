import React from "react";
import Plot from "react-plotly.js";
import data from "../../data/cars_data.json";

const TransmissionBoxplot = () => {
  // Extract `boite_de_vitesses` and `prix`
  const groupedData = data.reduce((acc, curr) => {
    const transmission = curr["boite_de_vitesses"];
    if (!acc[transmission]) acc[transmission] = [];
    acc[transmission].push(curr.prix);
    return acc;
  }, {});

  const transmissions = Object.keys(groupedData);
  const prices = Object.values(groupedData);

  return (
    <div className="w-full h-full">
      <Plot
        data={transmissions.map((transmission, index) => ({
          y: prices[index],
          type: "box",
          name: transmission,
          marker: { color: "rgba(31, 119, 180, 0.7)" }, // Muted color palette
          boxmean: true, // Add mean line inside the box
        }))}
        layout={{
          title: "Distribution des Prix selon la Boîte de Vitesses",
          xaxis: { title: "Boîte de Vitesses" },
          yaxis: { title: "Prix" },
          autosize: true,
          height: 600, // Adjust the height if needed
        }}
        useResizeHandler={true} // Enable responsiveness
        style={{ width: "100%", height: "100%" }} // Stretch to full container
      />
    </div>
  );
};

export default TransmissionBoxplot;
