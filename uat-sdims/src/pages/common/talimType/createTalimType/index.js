import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateTalim = dynamic(
  () => import("../../../../components/common/talimType/CreateTalimType"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={" Talimtype"} />
      <CreateTalim />
    </React.Fragment>
  );
}
