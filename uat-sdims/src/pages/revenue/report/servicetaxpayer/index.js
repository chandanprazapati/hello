import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import TaxPayerServiceSummary from "../../../../components/revenue/report/TaxPayerServiceSummary";
import TaxPayerModuleWiseSummary from "../../../../components/revenue/report/TaxPayerModuleWiseSummary";
import TaxPayerBusinessSummary from "../../../../components/revenue/report/TaxPayerBusinessSummary";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Service Tax Payer Summary"} />
      <TaxPayerServiceSummary/>
    </ViewPage>
  );
};

export default index;
