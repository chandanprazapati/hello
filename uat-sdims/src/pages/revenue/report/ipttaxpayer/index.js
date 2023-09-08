import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import IptTaxPayerSummary from "../../../../components/revenue/report/IptTaxPayerSummary";
import TaxPayerModuleWiseSummary from "../../../../components/revenue/report/TaxPayerModuleWiseSummary";
import TaxPayerBusinessSummary from "../../../../components/revenue/report/TaxPayerBusinessSummary";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Tax Payer Business Wise Summary"} />
      <IptTaxPayerSummary/>
    </ViewPage>
  );
};

export default index;
