import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import InvoiceTransaction from "../../../../components/revenue/report/InvoiceTransaction";
import GetTaxPayerRateWise from "../../../../components/revenue/report/TaxPayerRateWise";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Tax Payer Rate Wise"} />
      <GetTaxPayerRateWise/>
    </ViewPage>
  );
};

export default index;
