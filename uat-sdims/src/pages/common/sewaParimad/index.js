import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const SewaParimad = dynamic(
  () => import("../../../components/common/sewaParimad/SewaParimad"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"SewaParimad"} />
      <SewaParimad />
    </React.Fragment>
  );
}
