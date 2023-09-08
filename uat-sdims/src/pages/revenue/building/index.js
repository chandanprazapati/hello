import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const BuildingType = dynamic(
  () => import("../../../components/revenue/buildingType/BuildingType"),
  {
    ssr: false,
  }
);

export default function Index  () {
  return (
    <React.Fragment>
      <SeoOptimization title={"Building"} />
      <BuildingType />
    </React.Fragment>
  );
};

