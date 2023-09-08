import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const SubGroup = dynamic(
  () => import("../../../components/common/subGroup/SubGroup"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"SubGroup"} />
      <SubGroup />
    </React.Fragment>
  );
}
