import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const WorkType = dynamic(
  () => import("../../../components/planning/workType/WorkType"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Work Type"} />
      <WorkType/>
    </>
  );
};

export default index;
