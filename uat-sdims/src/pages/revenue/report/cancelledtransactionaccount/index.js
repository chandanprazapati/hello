import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import CancelledAccountTranscation from "../../../../components/revenue/report/CancelledAccountTransaction";
import CancelIncomeSummary from "../../../../components/revenue/report/CancelIncomeSummary";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Cancelled Account Transcation"} />
      <CancelledAccountTranscation/>
    </ViewPage>
  );
};

export default index;
