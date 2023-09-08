import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const TaxSubCategory = dynamic(
  () => import("../../../components/revenue/taxSubCategory/TaxSubCategory"),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Sub Category"} />
      <TaxSubCategory />
    </React.Fragment>
  );
}
