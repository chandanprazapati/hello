import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateAwabihawit = dynamic(
  () => import("../../../../components/sifarish/awabihawit/CreateAwabihawit"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Awabihawit"} />
      <CreateAwabihawit />
    </React.Fragment>
  );
}
