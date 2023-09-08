import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateAbroadVisit = dynamic(
  () => import("../../../../components/pis/abroadVisit/CreateAbroadVisit"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={" Abroad Visit Detail"} />
      <CreateAbroadVisit />
    </React.Fragment>
  );
}
