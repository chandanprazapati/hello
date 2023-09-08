import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Cast = dynamic(() => import("../../../components/common/cast/Cast"), {
  ssr: false,
});
export default function Index  () {
  return (
    <React.Fragment>
      <SeoOptimization title={"Cast"} />
      <Cast />
    </React.Fragment>
  );
};

