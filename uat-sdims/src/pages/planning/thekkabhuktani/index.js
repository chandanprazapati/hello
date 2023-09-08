import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const ThekkaBhuktaniType = dynamic(
  () => import("../../../components/planning/thekkaBhuktaniType/ThekkaBhuktaniType"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Thekka Bhuktani"} />
      <ThekkaBhuktaniType/>
    </>
  );
};

export default index;
