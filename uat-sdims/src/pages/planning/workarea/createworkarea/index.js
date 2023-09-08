import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateWork = dynamic(
  () => import("../../../../components/planning/workArea/CreateWork"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Create Work Area"} />
      <CreateWork/>
    </>
  );
};

export default index;
