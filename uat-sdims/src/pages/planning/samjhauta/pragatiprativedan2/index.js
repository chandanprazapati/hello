import React from "react";
import ViewPage from "../../../../components/viewPage/ViewPage";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const PrativedanAanuchi2 = dynamic(
  () =>
    import(
      "../../../../components/planning/prativedanAanusuchi2/PrativedanAanusuchi2"
    ),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Pragati Prativedan"} />
      <PrativedanAanuchi2 />
    </>
  );
};

export default index;
