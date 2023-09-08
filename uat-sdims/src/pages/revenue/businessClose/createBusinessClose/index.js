import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateBusinessCloseReason = dynamic(
  () =>
    import(
      "../../../../components/revenue/businessCloseReason/CreateBusinessCloseReason"
    ),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Business Close"} />
      <CreateBusinessCloseReason />
    </React.Fragment>
  );
}
