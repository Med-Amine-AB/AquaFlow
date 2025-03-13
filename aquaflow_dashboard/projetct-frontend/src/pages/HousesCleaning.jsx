import React from "react";
import { useTitre } from "../layout/DefaultLayout";


const HousesCleaning = () => {
     const { titre, setTitre } = useTitre();
        setTitre("Cars Data Cleaning");
  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container w-full">
        <iframe
          src="/static/cleaning/Houses_Data_Cleaning.html"
          title="Notebook Viewer"
          className="w-full h-screen border-0"
        />
      </div>
    </section>
  );
};

export default HousesCleaning;
