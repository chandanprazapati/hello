import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const BhuktaniType = dynamic(
  () => import("../../../components/planning/bhuktaniType/BhuktaniType"),
  { ssr: false }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Bhuktani"} />
      <BhuktaniType />
    </React.Fragment>
  );
};

