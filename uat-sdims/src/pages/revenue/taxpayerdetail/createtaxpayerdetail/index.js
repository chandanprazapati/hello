import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateTaxPayerDetail = dynamic(
  () =>
    import(
      "../../../../components/revenue/controllers/taxPayerDeatil/CreateTaxPayerDetail"
    ),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Payer Detail"} />
      <CreateTaxPayerDetail />
    </React.Fragment>
  );
}
