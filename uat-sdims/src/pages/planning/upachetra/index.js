import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const UpaChetra = dynamic(
  () => import("../../../components/planning/upaChetra/UpaChetra"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Upa Chetra"} />
      <UpaChetra />
    </>
  );
};

export default index;
