import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const TolBikasSanstha = dynamic(
  () => import("../../../components/planning/tolBikashSanstha/TolBikasSanstha"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Tol Bikash Sanstha"} />
      <TolBikasSanstha/>
    </>
  );
};

export default index;
