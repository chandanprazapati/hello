import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import InvoiceTransaction from "../../../../components/revenue/report/InvoiceTransaction";
import WardIncomeSummary from "../../../../components/revenue/report/WardIncomeSummary";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Ward Income Summary"} />
      <WardIncomeSummary/>
    </ViewPage>
  );
};

export default index;
