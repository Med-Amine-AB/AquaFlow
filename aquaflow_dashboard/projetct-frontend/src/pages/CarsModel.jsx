import React, { useState } from "react";
import axios from "axios";
import "./test.css";
import { useTitre } from "../layout/DefaultLayout";


const CarsModel = () => {
  const { titre, setTitre } = useTitre();
    setTitre("Cars Modele");
  const [formData, setFormData] = useState({
    marque: "",
    modele: "",
    "annee-modele": "",
    kilometrage: "",
    puissance_fiscale: "",
    nombre_de_portes: "",
    airbags: "",
    type_de_carburant: "",
    boite_de_vitesses: "",
    origine: "",
    etat: "",
    premiere_main: 0,
    climatisation: 0,
    abs: 0,
    esp: 0,
    "cd/mp3/bluetooth": 0,
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleToggle = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field] === 0 ? 1 : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPredictedPrice(null);

    const dataToSend = {};
    Object.keys(formData).forEach((key) => {
      dataToSend[key] = [
        ["annee-modele", "kilometrage", "puissance_fiscale", "nombre_de_portes", "airbags"].includes(key)
          ? Number(formData[key])
          : formData[key],
      ];
    });

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred while predicting.";
      setError(errorMessage);
      console.error("Prediction Error:", errorMessage);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg" style={{ maxWidth: "600px", margin: "auto", padding: "50px" }}>
      <h2 className="w-full text-center text-xl font-bold mb-3">Car Price Predictor</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => {
          // Handle select fields
          if (key === "type_de_carburant") {
            return (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label htmlFor={key} style={{ display: "block", fontWeight: "bold" }}>
                  {key.replace(/_/g, " ")}:
                </label>
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="focus:bg-slate-100"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  required
                >
                  <option value="">Select</option>
                  <option value="diesel">Diesel</option>
                  <option value="essence">Essence</option>
                  <option value="hybride">Hybride</option>
                  <option value="electrique">Electrique</option>
                </select>
              </div>
            );
          } else if (key === "boite_de_vitesses") {
            return (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label htmlFor={key} style={{ display: "block", fontWeight: "bold" }}>
                  {key.replace(/_/g, " ")}:
                </label>
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="focus:bg-slate-100"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  required
                >
                  <option value="">Select</option>
                  <option value="manuelle">Manuelle</option>
                  <option value="automatique">Automatique</option>
                </select>
              </div>
            );
          } else if (key === "origine") {
            return (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label htmlFor={key} style={{ display: "block", fontWeight: "bold" }}>
                  {key.replace(/_/g, " ")}:
                </label>
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="focus:bg-slate-100"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  required
                >
                  <option value="">Select</option>
                  <option value="ww au maroc">WW au Maroc</option>
                  <option value="dedouanee">Déduanée</option>
                  <option value="importee neuve">Importée Neuve</option>
                  <option value="pas encore dedouanee">Pas Encore Déduanée</option>
                </select>
              </div>
            );
          } else if (key === "etat") {
            return (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label htmlFor={key} style={{ display: "block", fontWeight: "bold" }}>
                  {key.replace(/_/g, " ")}:
                </label>
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="focus:bg-slate-100"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  required
                >
                  <option value="">Select</option>
                  <option value="tres bon">Très Bon</option>
                  <option value="excellent">Excellent</option>
                  <option value="bon">Bon</option>
                  <option value="pour pieces">Pour Pièces</option>
                  <option value="correct">Correct</option>
                  <option value="endommage">Endommagé</option>
                </select>
              </div>
            );
          } else if (["premiere_main", "climatisation", "abs", "esp", "cd/mp3/bluetooth"].includes(key)) {
            // Handle toggle switches
            return (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label htmlFor={key} style={{ display: "block", fontWeight: "bold" }}>
                  {key.replace(/_/g, " ")}:
                </label>
                <label className="switch">
                  <input
                    type="checkbox"
                    id={key}
                    checked={formData[key] === 1}
                    onChange={() => handleToggle(key)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            );
          } else {
            // Handle text and number fields
            return (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label htmlFor={key} style={{ display: "block", fontWeight: "bold" }}>
                  {key.replace(/_/g, " ")}:
                </label>
                <input
                  type={
                    ["annee-modele", "kilometrage", "puissance_fiscale", "nombre_de_portes", "airbags"].includes(key)
                      ? "number"
                      : "text"
                  }
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="focus:bg-slate-100"
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
            );
          }
        })}
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Predict Price
        </button>
      </form>
      {predictedPrice && (
        <div style={{ marginTop: "20px", fontSize: "18px", color: "green" }}>
          Predicted Price: {predictedPrice.toFixed(2)} DH
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", fontSize: "18px", color: "red" }}>
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default CarsModel;
