import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateChetra = dynamic(
  () => import("../../../../components/planning/chetra/CreateChetra"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Chetra"} />
      <CreateChetra/>
    </>
  );
};

export default index;
