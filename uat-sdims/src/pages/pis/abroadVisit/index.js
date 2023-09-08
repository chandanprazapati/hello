import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const AbroadVisit = dynamic(
  () => import("../../../components/pis/abroadVisit/AbroadVisit"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Abroad Visit Detail"} />
      <AbroadVisit />
    </React.Fragment>
  );
}
