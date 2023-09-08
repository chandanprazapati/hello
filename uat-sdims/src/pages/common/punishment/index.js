import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Punishment = dynamic(
  () => import("../../../components/common/punishment/Punishment"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Punishment"} />
      <Punishment />
    </React.Fragment>
  );
}
