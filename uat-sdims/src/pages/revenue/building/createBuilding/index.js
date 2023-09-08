import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateBuildingType = dynamic(
  () =>
    import("../../../../components/revenue/buildingType/CreateBuildingType"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Building"} />
      <CreateBuildingType />
    </React.Fragment>
  );
};

