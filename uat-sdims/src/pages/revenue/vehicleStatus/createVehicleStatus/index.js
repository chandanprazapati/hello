import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateVehicleStatus = dynamic(
  () =>
    import("../../../../components/revenue/vehicleStatus/CreateVehicleStatus"),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Vehicle Status"} />
      <CreateVehicleStatus />
    </React.Fragment>
  );
}
