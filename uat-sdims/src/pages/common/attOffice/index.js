import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const AttOffice = dynamic(
  () => import("../../../components/common/attOffice/AttOffice"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Att Office"} />
      <AttOffice />
    </React.Fragment>
  );
}
