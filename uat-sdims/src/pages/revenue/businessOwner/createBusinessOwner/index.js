import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateBusinessOwnershipType = dynamic(
  () =>
    import(
      "../../../../components/revenue/businessOwnershipType/CreateBusinessOwnershipType"
    ),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Business Ownership"} />
      <CreateBusinessOwnershipType />
    </React.Fragment>
  );
}
