import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import InvoiceTransaction from "../../../../components/revenue/report/InvoiceTransaction";
import GetTaxPayerRateWise from "../../../../components/revenue/report/TaxPayerRateWise";
import TaxPayerSummary from "../../../../components/revenue/report/TaxPayerSummary";
import TaxRateSummaryYearly from "../../../../components/revenue/report/TaxRateSummaryYearly";
import TaxSummaryReportYearly from "../../../../components/revenue/report/TaxSummaryReportYearly";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Tax Yearly summary"} />
      <TaxSummaryReportYearly/>
    </ViewPage>
  );               
};

export default index;
