import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateTalimModule = dynamic(
  () => import("../../../../components/pis/talimModule/CreateTalimModule"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Talim Module"} />
      <CreateTalimModule />
    </React.Fragment>
  );
}
