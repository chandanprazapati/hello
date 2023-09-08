import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const BudgetSource = dynamic(
  () => import("../../../components/planning/budgetSource/BudgetSource"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Budget Source"} />
      <BudgetSource/>
    </>
  );
};

export default index;
