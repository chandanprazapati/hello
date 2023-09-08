import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateBusinessStatus = dynamic(
  () =>
    import(
      "../../../../components/revenue/businessStatus/CreateBusinessStatus"
    ),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Business Status"} />
      <CreateBusinessStatus />
    </React.Fragment>
  );
}
