import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const UpaChetraDetail = dynamic(
  () => import("../../../components/planning/upaChetraDetail/UpaChetraDetail"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Upa Chetra Detail"} />
      <UpaChetraDetail/>
    </>
  );
};

export default index;
