import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const TaxPayerDetail = dynamic(
  () =>
    import(
      "../../../components/revenue/controllers/taxPayerDeatil/TaxPayerDetail"
    ),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Payer Detail"} />
      <TaxPayerDetail />
    </React.Fragment>
  );
}
