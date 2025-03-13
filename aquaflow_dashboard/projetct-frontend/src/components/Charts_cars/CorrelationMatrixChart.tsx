import React from "react";
import Plot from "react-plotly.js";
import cars_data from "../../data/cars_data.json";

// Helper function to calculate correlation matrix
const calculateCorrelationMatrix = (data: any[], features: string[]) => {
  const matrix = features.map((f1) =>
    features.map((f2) => {
      const values1 = data.map((item) => item[f1]).filter((v) => typeof v === "number");
      const values2 = data.map((item) => item[f2]).filter((v) => typeof v === "number");

      if (values1.length !== values2.length || values1.length === 0) return 0;

      const mean1 = values1.reduce((sum, v) => sum + v, 0) / values1.length;
      const mean2 = values2.reduce((sum, v) => sum + v, 0) / values2.length;

      const numerator = values1.reduce((sum, v, i) => sum + (v - mean1) * (values2[i] - mean2), 0);
      const denominator = Math.sqrt(
        values1.reduce((sum, v) => sum + Math.pow(v - mean1, 2), 0) *
          values2.reduce((sum, v) => sum + Math.pow(v - mean2, 2), 0)
      );

      return denominator ? numerator / denominator : 0;
    })
  );

  return matrix;
};

// Extract numerical features
const numericalFeatures = ["prix", "kilometrage", "puissance_fiscale", "annee-modele"];
const correlationMatrix = calculateCorrelationMatrix(cars_data, numericalFeatures);

const CorrelationHeatmap: React.FC = () => {
  return (
    <Plot
      data={[
        {
          z: correlationMatrix,
          x: numericalFeatures,
          y: numericalFeatures,
          type: "heatmap",
          colorscale: "RdBu",
          zmid: 0,
        },
      ]}
      layout={{
        title: "Correlation Heatmap",
        xaxis: { title: "Features" },
        yaxis: { title: "Features" },
        autosize: true,
      }}
    />
  );
};

export default CorrelationHeatmap;
