import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const InvoiceTransaction = dynamic(() => import("../../../../components/revenue/report/InvoiceTransaction"), {
  ssr: false,
});
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Invoice Transcation"} />
      <InvoiceTransaction/>
    </ViewPage>
  );
};

export default index;
