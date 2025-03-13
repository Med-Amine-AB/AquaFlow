import React from "react";
import { useTitre } from "../layout/DefaultLayout";


const CarsCleaning = () => {
     const { titre, setTitre } = useTitre();
        setTitre("Cars Data Cleaning");
  return (
    <section className="bg-gray-100 h-screen  flex justify-center items-center">
      <div className="container w-full">
        <iframe
          src="/static/cleaning/cars_data_cleaning.html"
          title="Notebook Viewer"
          className="w-full h-screen border-0"
        />
      </div>
    </section>
  );
};

export default CarsCleaning;
