import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Counter = dynamic(
  () => import("../../../components/common/counter/Counter"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Counter"} />
      <Counter />
    </React.Fragment>
  );
}
