import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Group = dynamic(() => import("../../../components/common/group/Group"), {
  ssr: false,
});
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Group"} />
      <Group />
    </React.Fragment>
  );
}
