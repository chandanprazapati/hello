import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const BusinessStatus = dynamic(
  () => import("../../../components/revenue/businessStatus/BusinessStatus"),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Business Status"} />
      <BusinessStatus />
    </React.Fragment>
  );
}
