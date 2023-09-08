import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateThekaBhuktaniType = dynamic(
  () => import("../../../../components/planning/thekkaBhuktaniType/CreateThekaBhuktaniType"),
  { ssr: false }
);

const index = () => {
  return (
    <>
      <SeoOptimization title={"Thekka Bhuktani"} />
      <CreateThekaBhuktaniType/>
    </>
  );
};

export default index;
