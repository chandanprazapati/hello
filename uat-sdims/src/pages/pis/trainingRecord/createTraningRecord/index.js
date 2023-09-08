import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateTraining = dynamic(
  () => import("../../../../components/pis/training/CreateTraining"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={" Training Record"} />
      <CreateTraining />
    </React.Fragment>
  );
}
