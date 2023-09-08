import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateSubPunishment = dynamic(
  () =>
    import("../../../../components/common/subPunishment/CreateSubPunishment"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Sub-Punishment"} />
      <CreateSubPunishment />
    </React.Fragment>
  );
}
