import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Nationality = dynamic(
  () => import("../../../components/common/nationality/Nationality"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Occupation"} />
      <Nationality />
    </React.Fragment>
  );
}
