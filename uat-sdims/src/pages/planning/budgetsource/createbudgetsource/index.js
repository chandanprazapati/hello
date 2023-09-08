import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateBudgetSource = dynamic(
  () => import("../../../../components/planning/budgetSource/CreateBudgetSource"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Budget Source"} />
      <CreateBudgetSource/>
    </>
  );
};

export default index;
