import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const TaxPayer = dynamic(
  () => import("../../../components/revenue/taxPayerType/TaxPayerType"),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Payer"} />
      <TaxPayer />
    </React.Fragment>
  );
}
