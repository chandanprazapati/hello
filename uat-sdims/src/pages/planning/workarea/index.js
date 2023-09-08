import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const WorkArea = dynamic(
  () => import("../../../components/planning/workArea/WorkArea"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Work Area"} />
      <WorkArea />
    </React.Fragment>
  );
}
