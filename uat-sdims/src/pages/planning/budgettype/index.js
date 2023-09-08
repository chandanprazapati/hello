import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const BudgetType = dynamic(
  () => import("../../../components/planning/budgetType/BudgetType"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Budget Type"} />
      <BudgetType/>
    </>
  );
};

export default index;
