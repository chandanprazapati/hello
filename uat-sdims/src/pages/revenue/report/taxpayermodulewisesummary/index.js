import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import InvoiceTransaction from "../../../../components/revenue/report/InvoiceTransaction";
import TaxPayerModuleWiseSummary from "../../../../components/revenue/report/TaxPayerModuleWiseSummary";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Invoice Transcation"} />
      <TaxPayerModuleWiseSummary/>
    </ViewPage>
  );
};

export default index;
