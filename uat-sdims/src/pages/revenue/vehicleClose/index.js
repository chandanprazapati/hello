import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const VehicleCloseReason = dynamic(
  () =>
  import("../../../components/revenue/vehicleCloseReason/VehicleCloseReason"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Vehicle Close"} />
      <VehicleCloseReason />
    </React.Fragment>
  );
};

