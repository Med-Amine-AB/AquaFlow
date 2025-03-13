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
    <div className="w-full p-2 shadow-lg rounded-md bg-white">
      <Plot
        data={[
          {
            z: correlationMatrix,
            x: numericalFeatures,
            y: numericalFeatures,
            type: "heatmap",
            colorscale: "RdBu",
            zmin: -1,
            zmax: 1,
            colorbar: {
              title: "Correlation",
              titleside: "right",
            },
          },
        ]}
        layout={{
          title: "Carte de Corrélation des Caractéristiques Numériques",
          xaxis: { title: "Features", automargin: true },
          yaxis: { title: "Features", automargin: true },
          margin: { l: 50, r: 50, t: 50, b: 50 },
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default CorrelationHeatmap;
