import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const Department = dynamic(
  () => import("../../../components/common/department/Department"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Department"} />
      <Department />
    </React.Fragment>
  );
}
