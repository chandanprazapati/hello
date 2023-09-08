import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const PadPurtiType = dynamic(
  () => import("../../../components/common/padPurtiType/PadPurtiType"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"PadPurtiType"} />
      <PadPurtiType />
    </React.Fragment>
  );
}
