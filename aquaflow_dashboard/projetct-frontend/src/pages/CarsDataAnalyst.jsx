// pages/CarsDataAnalyst.js
import React from "react";
import ChartOne from "../components/Charts_cars/ChartOne"
import ChartTwo from "../components/Charts_cars/ChartTwo"
import ChartThree from "../components/Charts_cars/ChartThree"
import PriceDistribution from "../components/Charts_cars/PriceDistribution";
import KilometrageVsPrix from "../components/Charts_cars/KilometrageVsPrix";
import AnneeModeleVsPrix from "../components/Charts_cars/AnneeModeleVsPrix";
import TopBrandsBarChart from "../components/Charts_cars/TopBrandsBarChart";
import FuelTypePieChart from "../components/Charts_cars/FuelTypePieChart";
import OriginPieChart from "../components/Charts_cars/OriginPieChart";
import CorrelationMatrixChart from "../components/Charts_cars/CorrelationMatrixChart";
import TopBrandsAvgPriceBarChart from "../components/Charts_cars/TopBrandsAvgPriceBarChart";
import VehicleEtatBarChart from "../components/Charts_cars/VehicleEtatBarChart";
import DescribeTable from "../components/Charts_cars/DescribeTable";
import BoxplotChart from "../components/Charts_cars/BoxplotChart";
import CorrelationHeatmap from "../components/Charts_cars/CorrelationHeatmap";
import { useTitre } from "../layout/DefaultLayout";
import FuelTypeBoxplot from "../components/Charts_cars/FuelTypeBoxplot";
import TransmissionBoxplot from "../components/Charts_cars/TransmissionBoxplot";
import PriceOutlierBoxplot from "../components/Charts_cars/PriceOutlierBoxplot";



const CarsDataAnalyst = () => {
  const { titre, setTitre } = useTitre();
  setTitre("Cars Data Analyst");
  return (<div className="h-screen w-full ">
     <div className="lg:grid lg:grid-cols-2 lg:gap-2">
        <PriceDistribution/>
        <FuelTypePieChart/>
        <KilometrageVsPrix/>
        <BoxplotChart/>
        {/* <BoxplotChart/> */}
        {/* <AnneeModeleVsPrix/> */}
        <OriginPieChart/>
        <TopBrandsBarChart/> 
        <TopBrandsAvgPriceBarChart/>
        {/* <CorrelationMatrixChart/> */}
        <VehicleEtatBarChart/>
        <CorrelationHeatmap/>
        <FuelTypeBoxplot/>
        <TransmissionBoxplot/>
        <PriceOutlierBoxplot/>
      </div>
        <DescribeTable/>
  </div>);
};

export default CarsDataAnalyst;
