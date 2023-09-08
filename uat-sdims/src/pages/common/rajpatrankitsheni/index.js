import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const RajPatrankitSheni = dynamic(
  () =>
    import("../../../components/common/rajPatrankitSheni/RajPatrankitSheni"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"RajPatrankitSheni"} />
      <RajPatrankitSheni />
    </React.Fragment>
  );
}
