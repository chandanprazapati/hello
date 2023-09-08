import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateWorkType = dynamic(
  () => import("../../../../components/planning/workType/CreateWorkType"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Work Type"} />
      <CreateWorkType/>
    </>
  );
};

export default index;
