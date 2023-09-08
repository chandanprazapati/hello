import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Samjhauta = dynamic(
  () => import("../../../components/planning/samjhauta/Samjhauta"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Samjhauta"} />
      <Samjhauta />
    </React.Fragment>
  );
}
