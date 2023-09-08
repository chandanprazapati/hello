import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import IncomeSummary from "../../../../components/revenue/report/IncomeSummary";
import CancelIncomeSummary from "../../../../components/revenue/report/CancelIncomeSummary";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Cancel Income Summary"} />
      <CancelIncomeSummary/>
    </ViewPage>
  );
};

export default index;
