import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const FuelType = dynamic(
  () => import("../../../components/revenue/fuelType/FuelType"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Fuel"} />
      <FuelType/>
    </React.Fragment>
  );
};

