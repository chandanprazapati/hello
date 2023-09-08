import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const DeactiveEmployee = dynamic(
  () => import("../../../components/pis/deactiveEmployee/DeactiveEmployee"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Deactive Employee"} />
      <DeactiveEmployee />
    </React.Fragment>
  );
}
