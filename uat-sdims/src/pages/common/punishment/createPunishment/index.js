import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreatePunishment = dynamic(
  () => import("../../../../components/common/punishment/CreatePunishment"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={" Punishment"} />
      <CreatePunishment />
    </React.Fragment>
  );
}
