import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateWard = dynamic(
  () => import("../../../../components/common/ward/CreateWard"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Create Ward"} />
      <CreateWard />
    </React.Fragment>
  );
}
