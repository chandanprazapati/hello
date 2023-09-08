import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const YojanaSamjhauta = dynamic(
  () => import("../../../components/planning/yojanaSamjhauta/YojanaSamjhauta"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Samjhauta Garidiney"} />
      <YojanaSamjhauta/>
    </>
  );
};

export default index;
