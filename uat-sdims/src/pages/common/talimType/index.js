import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const TalimType = dynamic(
  () => import("../../../components/common/talimType/TalimType"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Talim Type"} />
      <TalimType />
    </React.Fragment>
  );
}
