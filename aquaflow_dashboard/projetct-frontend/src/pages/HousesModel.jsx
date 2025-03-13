import React, { useState } from "react";
import axios from "axios";
import "./test.css";

const RealEstateModel = () => {
  const [formData, setFormData] = useState({
    Type: "",
    "Area in m²": "",
    Rooms: "",
    Bedrooms: "",
    Bathrooms: "",
    Condition: "",
    Floor: "",
    "House Age in ans": "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPredictedPrice(null);

    const dataToSend = {};
    Object.keys(formData).forEach((key) => {
      dataToSend[key] = [formData[key]];
    });

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict_house", dataToSend, {
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
      <h2 className="w-full text-center text-xl font-bold mb-3">Real Estate Price Predictor</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => {
                if (key === "Type") {
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
                        <option value="Appartements Casablanca">Appartements</option>
                        <option value="Villas & maisons de luxe Casablanca">
                          Villas & maisons de luxe
                        </option>
                        <option value="Riad Casablanca">Riad</option>
                        <option value="Maisons Casablanca">Maisons</option>
                      </select>
                    </div>
                  );
                }else if (key === "Condition") {
            // Handle select fields
            return (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label htmlFor={key} style={{ display: "block", fontWeight: "bold" }}>
                  {key}:
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
                  
                >
                  <option value="">Select</option>
                  <option value="Bon état">Bon état</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Correct">Correct</option>
                  <option value="Endommagé">Endommagé</option>
                </select>
              </div>
            );
          } else {
            // Handle text and number fields
            return (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label htmlFor={key} style={{ display: "block", fontWeight: "bold" }}>
                  {key}:
                </label>
                <input
                  type={["Area in m²", "Rooms", "Bedrooms", "Bathrooms", "Floor", "House Age in ans"].includes(key) ? "number" : "text"}
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

export default RealEstateModel;
