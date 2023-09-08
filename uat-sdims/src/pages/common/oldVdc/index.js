import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const OldVdc = dynamic(
  () => import("../../../components/common/oldVdc/OldVdc"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Old Vdc"} />
      <OldVdc />
    </React.Fragment>
  );
}
