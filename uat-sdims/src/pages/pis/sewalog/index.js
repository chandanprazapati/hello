import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Sewalog = dynamic(
  () => import("../../../components/pis/sewalog/Sewalog"),
  { ssr: false }
);

export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Sewalog"} />
      <Sewalog />
    </React.Fragment>
  );
};

