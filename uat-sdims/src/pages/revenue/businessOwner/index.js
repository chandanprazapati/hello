import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const BusinessOwnershipType = dynamic(
  () =>
    import(
      "../../../components/revenue/businessOwnershipType/BusinessOwnershipType"
    ),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Business Ownership"} />
      <BusinessOwnershipType />
    </React.Fragment>
  );
}
