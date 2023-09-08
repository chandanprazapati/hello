import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateTolBikashSanstha = dynamic(
  () => import("../../../../components/planning/tolBikashSanstha/CreateTolBikashSanstha"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Tol Bikash Sanstha"} />
      <CreateTolBikashSanstha/>
    </>
  );
};

export default index;
