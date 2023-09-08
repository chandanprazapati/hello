import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const WadaReport = dynamic(
  () => import("../../../../components/planning/wadaRelatedReport/WadaReport"),
  { ssr: false }
);
const index = () => {
  return (
    <React.Fragment>
      <SeoOptimization title={"Wada Related Report"} />
      <WadaReport />
    </React.Fragment>
  );
};

export default index;
