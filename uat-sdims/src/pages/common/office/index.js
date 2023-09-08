import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const Office = dynamic(
  () => import("../../../components/common/office/Office"),
  { ssr: false }
);

export default function OfficePage() {
  return (
    <React.Fragment>
      <SeoOptimization title="Office" />
      <Office />
    </React.Fragment>
  );
}
