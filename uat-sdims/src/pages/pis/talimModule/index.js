import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const TalimModule = dynamic(
  () => import("../../../components/pis/talimModule/TalimModule"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Talim Module"} />
      <TalimModule />
    </React.Fragment>
  );
}
