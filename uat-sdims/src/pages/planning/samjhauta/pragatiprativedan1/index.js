import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const PrativedanAanuchi1 = dynamic(
  () =>
    import(
      "../../../../components/planning/prativedanAanuchi1/PrativedanAanuchi1"
    ),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Pragati Prativedan"} />
      <PrativedanAanuchi1 />
    </React.Fragment>
  );
}
