import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const SamjhautaGaripau = dynamic(
  () => import("../../../components/planning/samjhautaGaripau/SamjhautaGaripau"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Samjhauta Garipau"} />
      <SamjhautaGaripau/>
    </>
  );
};

export default index;
