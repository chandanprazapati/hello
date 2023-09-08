import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const PreviousOffice = dynamic(
  () => import("../../../components/pis/previousOffice/PreviousOffice"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Previous Office"} />
      <PreviousOffice />
    </React.Fragment>
  );
}
