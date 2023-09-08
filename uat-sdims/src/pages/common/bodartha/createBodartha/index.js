import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateBodartha = dynamic(
  () => import("../../../../components/common/bodartha/CreateBodartha"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={" Bodartha"} />
      <CreateBodartha />
    </React.Fragment>
  );
}
