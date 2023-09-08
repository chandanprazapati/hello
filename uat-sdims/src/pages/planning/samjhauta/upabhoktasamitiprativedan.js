import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const Prativedan = dynamic(
  () => import("../../../components/planning/prativedan/Prativedan"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Samjhauta Prativedan"} />
      <Prativedan/>
    </>
  );
};

export default index;
