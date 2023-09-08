import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const AwardType = dynamic(
  () => import("../../../components/common/awardType/AwardType"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Award Type"} />
      <AwardType />
    </React.Fragment>
  );
}
