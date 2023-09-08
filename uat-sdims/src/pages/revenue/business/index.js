import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const BusinessType = dynamic(
  () => import("../../../components/revenue/businessType/BusinessType"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Business"} />
      <BusinessType />
    </React.Fragment>
  );
};

