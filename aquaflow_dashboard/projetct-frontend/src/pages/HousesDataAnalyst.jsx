import React from "react";
import { useTitre } from "../layout/DefaultLayout";
import PrixVsSurface from "../components/Charts_houses/PrixVsSurface";
import DistributionProprietes from "../components/Charts_houses/DistributionProprietes";
import HistogramPrices from "../components/Charts_houses/HistogramPrices";
import PropertyConditionPieChart from "../components/Charts_houses/PropertyConditionPieChart";
import GeospatialPlot from "../components/Charts_houses/GeospatialPlot";
import ApartmentMap from "../components/Charts_houses/ApartmentMap";
import BoxPlotHouseAge from "../components/Charts_houses/BoxPlotHouseAge";




const HousesDataAnalyst = () => {
  const { titre, setTitre } = useTitre();
  setTitre("houses Data Analyst");
  return (<div className="h-screen w-full ">
     <div className="grid grid-cols-2 gap-2">
        <PrixVsSurface/>
        <DistributionProprietes/>
        <HistogramPrices/>
        <PropertyConditionPieChart className="col-span-2"/>
        <GeospatialPlot/>
        <BoxPlotHouseAge/>
      </div>
        {/* <ApartmentMap/> */}
  </div>);
};

export default HousesDataAnalyst;
