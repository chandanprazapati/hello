import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const Fiscal = dynamic(
  () => import("../../../components/common/fiscal/Fiscal"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title="Fiscal Year" />
      <Fiscal />
    </React.Fragment>
  );
}
