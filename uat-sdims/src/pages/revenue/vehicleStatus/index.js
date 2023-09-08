import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const VehicleStatus = dynamic(
  () => import("../../../components/revenue/vehicleStatus/VehicleStatus"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Vehicle Status"} />
      <VehicleStatus/>
    </React.Fragment>
  );
};

