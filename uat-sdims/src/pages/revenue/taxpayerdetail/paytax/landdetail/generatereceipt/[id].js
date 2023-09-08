import React from "react";
import SeoOptimization from "../../../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const GenerateReceipt = dynamic(
  () => import("../../../../../../components/revenue/controllers/taxPayerDeatil/GenerateReceipt"),
  {
    ssr: false,
  }
);
const index = () => {
  return (
    <React.Fragment>
      <SeoOptimization title={"Generate Receipt"} />
      <GenerateReceipt/>
    </React.Fragment>
  );
};

export default index;
