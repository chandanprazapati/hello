import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateVehicleType = dynamic(
  () => import("../../../../components/revenue/vehicleType/CreateVehicleType"),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Vehicle"} />
      <CreateVehicleType />
    </React.Fragment>
  );
}
