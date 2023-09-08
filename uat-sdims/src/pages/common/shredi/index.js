import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const Shredi = dynamic(
  () => import("../../../components/common/shredi/Shredi"),
  { ssr: false }
);

export default function Index ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Shredi"} />
      <Shredi />
    </React.Fragment>
  );
};

