import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const UpavoktaSamiti = dynamic(
  () => import("../../../components/planning/upavoktaSamiti/UpavoktaSamiti"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Upabhokta Samiti"} />
      <UpavoktaSamiti/>
    </>
  );
};

export default index;
