import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Relation = dynamic(
  () => import("../../../components/common/relation/Relation"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Relation"} />
      <Relation />
    </React.Fragment>
  );
}
