import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateTakeOverType = dynamic(
  () => import("../../../../components/revenue/takeOverType/CreateTakeOver"),
  {
    ssr: false,
  }
);
export default function Index  () {
  return (
    <React.Fragment>
      <SeoOptimization title={"Take Over"} />
      <CreateTakeOverType/>
    </React.Fragment>
  );
};

