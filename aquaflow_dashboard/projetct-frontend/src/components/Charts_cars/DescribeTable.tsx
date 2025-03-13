import React from "react";
import cars_data from "../../data/cars_data.json";

// Helper function to calculate statistics
const calculateStats = (data: any[], field: string) => {
  const values = data
    .map((item) => item[field])
    .filter((value) => typeof value === "number" && !isNaN(value));

  if (values.length === 0) {
    return null;
  }

  const count = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / count;
  const sortedValues = [...values].sort((a, b) => a - b);
  const min = sortedValues[0];
  const max = sortedValues[sortedValues.length - 1];
  const median = sortedValues[Math.floor(count / 2)];
  const q1 = sortedValues[Math.floor(count / 4)];
  const q3 = sortedValues[Math.floor((3 * count) / 4)];
  const variance =
    values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
  const stdDev = Math.sqrt(variance);

  return { count, mean, stdDev, min, q1, median, q3, max };
};

const DescribeTable: React.FC = () => {
  const numericFields = [
    "annee-modele",
    "kilometrage",
    "puissance_fiscale",
    "nombre_de_portes",
    "premiere_main",
    "airbags",
    "climatisation",
    "abs",
    "esp",
    "cd/mp3/bluetooth",
    "prix",
  ];

  const stats = numericFields.map((field) => ({
    field,
    stats: calculateStats(cars_data, field),
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-3xl text-center font-bold w-full p-8">Descriptive Statistics</h2>
      <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-center p-5 text-sm  rtl:text-right text-gray-700 :text-gray-400">
        <thead className="text-xs p-5 text-gray-900 uppercase bg-gray-400 :bg-gray-700 :text-gray-400">
          <tr className="py-2">
            <th className="p-4">Field</th>
            <th className="p-4">Count</th>
            <th className="p-4">Mean</th>
            <th className="p-4">Std Dev</th>
            <th className="p-4">Min</th>
            <th className="p-4">Q1</th>
            <th className="p-4">Median</th>
            <th className="p-4">Q3</th>
            <th className="p-4">Max</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(({ field, stats }) => (
            <tr className="odd:bg-gray-100 hover:odd:bg-gray-300  odd::bg-gray-900 even:bg-gray-400 hover:even:bg-gray-500 even::bg-gray-800 border-b :border-gray-700" key={field}>
              <td className="p-4 font-semibold text-black">{field}</td>
              {stats ? (
                <>
                  <td className="p-4">{stats.count}</td>
                  <td className="p-4">{stats.mean.toFixed(2)}</td>
                  <td className="p-4">{stats.stdDev.toFixed(2)}</td>
                  <td className="p-4">{stats.min}</td>
                  <td className="p-4">{stats.q1}</td>
                  <td className="p-4">{stats.median}</td>
                  <td className="p-4">{stats.q3}</td>
                  <td className="p-4">{stats.max}</td>
                </>
              ) : (
                <td className="p-4" colSpan={8}>No Data</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DescribeTable;
