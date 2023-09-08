import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateTaxModule = dynamic(
  () => import("../../../../components/revenue/taxModule/CreateTaxModule"),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Module"} />
      <CreateTaxModule />
    </React.Fragment>
  );
}
