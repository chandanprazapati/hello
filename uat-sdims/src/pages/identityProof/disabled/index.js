import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Disabled = dynamic(
  () => import("../../../components/identityProof/disabled/Disabled"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Disabled"} />
      <Disabled />
    </React.Fragment>
  );
}
