import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Service = dynamic(
  () => import("../../../components/revenue/service/Service"),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Service"} />
      <Service />
    </React.Fragment>
  );
}
