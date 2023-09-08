import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Education = dynamic(
  () => import("../../../components/common/education/Education"),
  { ssr: false }
);
export default function Index  () {
  return (
    <React.Fragment>
      <SeoOptimization title={"Education"} />
      <Education />
    </React.Fragment>
  );
};

