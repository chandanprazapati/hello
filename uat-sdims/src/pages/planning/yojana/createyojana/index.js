import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateYojana = dynamic(
  () => import("../../../../components/planning/yojana/CreateYojana"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Yojana"} />
      <CreateYojana/>
    </>
  );
};

export default index;