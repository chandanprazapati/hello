import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const KarKatti = dynamic(
  () => import("../../../components/planning/karKatti/Karkatti"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Kar Katti"} />
      <KarKatti />
    </>
  );
};

export default index;
