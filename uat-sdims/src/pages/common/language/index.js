import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Language = dynamic(
  () => import("../../../components/common/language/Language"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Language"} />
      <Language />
    </React.Fragment>
  );
}
