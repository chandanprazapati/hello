import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateCounter = dynamic(
  () => import("../../../../components/common/counter/CreateCounter"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Counter"} />
      <CreateCounter />
    </React.Fragment>
  );
}
