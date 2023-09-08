import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateAwardDetail = dynamic(
  () => import("../../../../components/pis/awardDetail/CreateAwardDetail"),
  { ssr: false }
);
export default function Index  () {
  return (
    <React.Fragment>
      <SeoOptimization title={"Award Detail"} />
      <CreateAwardDetail/>
    </React.Fragment>
  );
};