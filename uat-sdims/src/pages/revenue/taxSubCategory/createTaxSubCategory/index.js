import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateTaxSubCategory = dynamic(
  () => import("../../../../components/revenue/taxSubCategory/CreateTaxSubCategory"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Sub Category"} />
      <CreateTaxSubCategory/>
    </React.Fragment>
  );
};

