import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Bodartha = dynamic(
  () => import("../../../components/common/bodartha/Bodartha"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Bodartha"} />
      <Bodartha />
    </React.Fragment>
  );
}
