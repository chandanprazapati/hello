import React from "react";
import ViewPage from "../../../../components/viewPage/ViewPage";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const SampannaYojana = dynamic(
  () => import("../../../../components/planning/sampannaYojana/SampannaYojana"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Sampanna yojana"} />
      <SampannaYojana />
    </>
  );
};

export default index;
