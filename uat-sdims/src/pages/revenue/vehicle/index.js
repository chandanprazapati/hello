import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const VehicleType = dynamic(
  () => import("../../../components/revenue/vehicleType/VehicleType"),
  {
    ssr: false,
  }
);

export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Vehicle"} />
      <VehicleType/>
    </React.Fragment>
  );
};

