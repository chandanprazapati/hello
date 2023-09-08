import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const ThekkaKarKatti = dynamic(
  () => import("../../../components/planning/thekkaKarKatti/ThekkaKarKatti"),
  { ssr: false }
);
  
const index = () => {
  return (
    <>
      <SeoOptimization title={"Thekka Karkatti"} />
      <ThekkaKarKatti/>
    </>
  );
};

export default index;
