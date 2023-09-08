import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const AttOfficeType = dynamic(
  () => import("../../../components/common/attOfficeType/AttOfficeType"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title="Att Office Type" />
      <AttOfficeType />
    </React.Fragment>
  );
}
