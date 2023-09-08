import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateTaxPayer = dynamic(
  () =>
    import("../../../../components/revenue/taxPayerType/CreateTaxPayerType"),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Tax Payer"} />
      <CreateTaxPayer />
    </React.Fragment>
  );
}
