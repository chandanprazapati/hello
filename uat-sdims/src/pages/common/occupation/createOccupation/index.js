import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateOccupation = dynamic(
  () => import("../../../../components/common/occupation/CreateOccupation"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Occupation"} />
      <CreateOccupation />
    </React.Fragment>
  );
}
