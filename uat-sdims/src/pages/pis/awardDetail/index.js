import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const AwardDetail = dynamic(
  () => import("../../../components/pis/awardDetail/AwardDetail"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Award Detail"} />
      <AwardDetail />
    </React.Fragment>
  );
}
