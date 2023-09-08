import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateBusinessType = dynamic(
  () =>
    import("../../../../components/revenue/businessType/CreateBusinessType"),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Business"} />
      <CreateBusinessType />
    </React.Fragment>
  );
}
