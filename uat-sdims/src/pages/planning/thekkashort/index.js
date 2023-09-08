import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const ThekkaShortType = dynamic(
  () => import("../../../components/planning//thekkaShortType/ThekkaShortType"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Thekka Short"} />
      <ThekkaShortType/>
    </>
  );
};

export default index;

