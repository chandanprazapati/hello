import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateDisabled = dynamic(
  () => import("../../../../components/identityProof/disabled/CreateDisabled"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Disabled"} />
      <CreateDisabled />
    </React.Fragment>
  );
}
