import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import InvoiceTransaction from "../../../../components/revenue/report/InvoiceTransaction";
import IncomeSummaryServiceWise from "../../../../components/revenue/report/IncomeSummaryServiceWise";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Invoice Transcation"} />
      <IncomeSummaryServiceWise/>
    </ViewPage>
  );
};

export default index;
