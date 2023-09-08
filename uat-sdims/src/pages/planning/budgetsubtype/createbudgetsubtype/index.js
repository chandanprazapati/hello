import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateBudgetSubTypeX = dynamic(
  () => import("../../../../components/planning/budgetSubType/CreateBudgetSubType"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Budget Sub Type"} />
      <CreateBudgetSubTypeX/>
    </>
  );
};

export default index;
