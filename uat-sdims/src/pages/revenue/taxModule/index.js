import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const TaxModule = dynamic(
  () => import("../../../components/revenue/taxModule/TaxModule"),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Module"} />
      <TaxModule />
    </React.Fragment>
  );
}
