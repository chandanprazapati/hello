import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const Sewa = dynamic(() => import("../../../components/common/sewa/Sewa"), {
  ssr: false,
});

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Sewa"} />
      <Sewa />
    </React.Fragment>
  );
}
