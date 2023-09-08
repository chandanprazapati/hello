import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Ward = dynamic(() => import("../../../components/common/ward/Ward"), {
  ssr: false,
});

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Ward"} />
      <Ward />
    </React.Fragment>
  );
}
