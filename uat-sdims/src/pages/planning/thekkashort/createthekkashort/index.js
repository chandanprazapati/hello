import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateThekkaShortType = dynamic(
  () => import("../../../../components/planning/thekkaShortType/CreateThekkaShortType"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Thekka Short"} />
      <CreateThekkaShortType/>
    </>
  );
};

export default index;
