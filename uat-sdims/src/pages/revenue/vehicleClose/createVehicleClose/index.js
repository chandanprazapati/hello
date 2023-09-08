import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateVehicleCloseReason = dynamic(
  () =>
    import(
      "../../../../components/revenue/vehicleCloseReason/CreateVehicleCloseReason"
    ),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Vehicle Close"} />
      <CreateVehicleCloseReason />
    </React.Fragment>
  );
}
