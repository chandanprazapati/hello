import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateSartaSetup = dynamic(
  () => import("../../../../components/planning/sartaSetup/CreateSartaSetup"),
  { ssr: false }
);

const index = () => {
  return (
    <>
      <SeoOptimization title={"Sarta"} />
      <CreateSartaSetup/>
    </>
  );
};

export default index;
