import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Training = dynamic(
  () => import("../../../components/pis/training/Training"),
  { ssr: false }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Training"} />
      <Training />
    </React.Fragment>
  );
};

