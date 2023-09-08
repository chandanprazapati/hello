import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateAward = dynamic(
  () => import("../../../../components/common/awardType/CreateAwardType"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Award Type"} />
      <CreateAward />
    </React.Fragment>
  );
}
