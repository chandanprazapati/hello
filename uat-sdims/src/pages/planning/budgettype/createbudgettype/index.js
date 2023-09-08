import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateBudgetType = dynamic(
  () => import("../../../../components/planning/budgetType/CreateBudgetType"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Budget Type"} />
      <CreateBudgetType/>
    </>
  );
};

export default index;
