import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const SartaSetup = dynamic(
  () => import("../../../components/planning/sartaSetup/SartaSetup"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Sarta"} />
      <SartaSetup />
    </>
  );
};

export default index;
