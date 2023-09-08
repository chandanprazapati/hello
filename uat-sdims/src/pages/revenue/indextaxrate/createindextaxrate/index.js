import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateTaxRate = dynamic(
  () => import("../../../../components/revenue/controllers/taxRate/CreateTaxRate"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Index Tax Rate"} />
      <CreateTaxRate/>
    </React.Fragment>
  );
};

