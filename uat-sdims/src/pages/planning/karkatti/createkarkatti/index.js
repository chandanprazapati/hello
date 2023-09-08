import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateKarKatti = dynamic(
  () => import("../../../../components/planning/karKatti/CreateKarKatti"),
  { ssr: false }
);

const index = () => {
  return (
    <>
      <SeoOptimization title={"Kar Katti"} />
      <CreateKarKatti />
    </>
  );
};

export default index;
