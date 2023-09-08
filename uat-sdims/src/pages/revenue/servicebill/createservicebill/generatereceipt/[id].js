import React from "react";
import SeoOptimization from "../../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const GenerateReceipt = dynamic(
  () => import("../../../../../components/revenue/controllers/serviceBill/GenerateReceipt"),
  {
    ssr: false,
  }
);
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Generate Receipt"} />
      <GenerateReceipt/>
    </ViewPage>
  );
};

export default index;
