import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const TaxCategory = dynamic(
  () => import("../../../components/revenue/taxCategory/TaxCategory"),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Category"} />
      <TaxCategory />
    </React.Fragment>
  );
}
