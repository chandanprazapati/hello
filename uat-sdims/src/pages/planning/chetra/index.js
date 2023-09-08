import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const Chetra = dynamic(
  () => import("../../../components/planning/chetra/Chetra"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Chetra"} />
      <Chetra/>
    </>
  );
};

export default index;
