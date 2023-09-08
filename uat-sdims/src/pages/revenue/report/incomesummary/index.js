import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import IncomeSummary from "../../../../components/revenue/report/IncomeSummary";
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Income Summary"} />
      <IncomeSummary/>
    </ViewPage>
  );
};

export default index;
