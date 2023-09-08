import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const BusinessCloseReason = dynamic(
  () =>
    import(
      "../../../components/revenue/businessCloseReason/BusinessCloseReason"
    ),
  {
    ssr: false,
  }
);
const index = () => {
  return (
    <React.Fragment>
      <SeoOptimization title={"Business Close Reason"} />
      <BusinessCloseReason />
    </React.Fragment>
  );
};

export default index;
