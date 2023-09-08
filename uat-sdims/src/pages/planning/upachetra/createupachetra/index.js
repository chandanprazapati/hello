import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateUpaChetraComp = dynamic(
  () => import("../../../../components/planning/upaChetra/CreateUpaChetraComp"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Upa Chetra"} />
      <CreateUpaChetraComp/>
    </>
  );
};

export default index;
