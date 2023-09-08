import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateTaxCategory = dynamic(
  () => import("../../../../components/revenue/taxCategory/CreateTaxCategory"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Category"} />
      <CreateTaxCategory/>
    </React.Fragment>
  );
};

