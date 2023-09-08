import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateFuelType = dynamic(
  () => import("../../../../components/revenue/fuelType/CreateFuelType"),
  {
    ssr: false,
  }
);
export default function Index  () {
  return (
    <React.Fragment>
      <SeoOptimization title={"Fuel"} />
      <CreateFuelType/>
    </React.Fragment>
  );
};

