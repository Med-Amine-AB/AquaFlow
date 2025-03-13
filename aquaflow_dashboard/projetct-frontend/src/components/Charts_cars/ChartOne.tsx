import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import cars_data from "../../data/cars_data.json";

interface Car {
  marque: string;
  modele: string;
  "annee-modele": number;
  kilometrage: number;
  type_de_carburant: string;
  puissance_fiscale: number;
  boite_de_vitesses: string;
  nombre_de_portes: number;
  origine: string;
  premiere_main: number;
  etat: string;
  airbags: number;
  climatisation: number;
  abs: number;
  esp: number;
  "cd/mp3/bluetooth": number;
  prix: number;
}

const typedCarsData: Car[] = cars_data as Car[];

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    type: "numeric",
    title: {
      text: "Kilometrage",
    },
  },
  yaxis: {
    title: {
      text: "Prix (MAD)",
    },
  },
  stroke: {
    curve: "smooth",
  },
  dataLabels: {
    enabled: false,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: { x: number; y: number }[];
  }[];
}

const ChartOne: React.FC = () => {
  const chartData = typedCarsData.map((car) => ({
    x: car.kilometrage,
    y: car.prix,
  }));

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Kilometrage vs Prix",
        data: chartData,
      },
    ],
  });

  return (
    <div className="col-span-12 rounded-sm w-full border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Kilometrage vs Prix</p>
              <p className="text-sm font-medium">Relationship between kilometrage and price</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
