import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const SubPunishment = dynamic(
  () => import("../../../components/common/subPunishment/SubPunishment"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Sub-Punishment"} />
      <SubPunishment />
    </React.Fragment>
  );
}
