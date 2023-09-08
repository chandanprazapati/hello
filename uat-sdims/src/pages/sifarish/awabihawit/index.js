import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Awabihawit = dynamic(
  () => import("../../../components/sifarish/awabihawit/Awabihawit"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Awabihawit"} />
      <Awabihawit />
    </React.Fragment>
  );
}
