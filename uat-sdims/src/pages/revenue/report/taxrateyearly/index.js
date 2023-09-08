import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import InvoiceTransaction from "../../../../components/revenue/report/InvoiceTransaction";
import GetTaxPayerRateWise from "../../../../components/revenue/report/TaxPayerRateWise";
import TaxPayerSummary from "../../../../components/revenue/report/TaxPayerSummary";
import TaxRateSummaryYearly from "../../../../components/revenue/report/TaxRateSummaryYearly";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Tax Rate Yearly"} />
      <TaxRateSummaryYearly/>
    </ViewPage>
  );               
};

export default index;
