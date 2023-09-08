import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const TakeOverType = dynamic(
  () => import("../../../components/revenue/takeOverType/TakeOverType"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Take Over"} />
      <TakeOverType/>
    </React.Fragment>
  );
};

