import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateSubGroup = dynamic(
  () => import("../../../../components/common/subGroup/CreateSubGroup"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"SubGroup"} />
      <CreateSubGroup />
    </React.Fragment>
  );
}
