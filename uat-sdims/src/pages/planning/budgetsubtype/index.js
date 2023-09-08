import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const BudgetSubType = dynamic(
  () => import("../../../components/planning/budgetSubType/BudgetSubType"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Budget Sub Type"} />
      <BudgetSubType />
    </>
  );
};

export default index;
