import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Occupation = dynamic(
  () => import("../../../components/common/occupation/Occupation"),
  { ssr: false }
);
export default function index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Occupation"} />
      <Occupation />
    </React.Fragment>
  );
}
