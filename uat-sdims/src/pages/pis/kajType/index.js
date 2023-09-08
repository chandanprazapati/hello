import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const KajType = dynamic(
  () => import("../../../components/pis/kajType/KajType"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Kaj Type"} />
      <KajType />
    </React.Fragment>
  );
}
