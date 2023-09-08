import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const Yojana = dynamic(
  () => import("../../../components/planning/yojana/Yojana"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Yojana"} />
      <Yojana/>
    </>
  );
};

export default index;
