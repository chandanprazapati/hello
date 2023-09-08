import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateThekkaKarKatti = dynamic(
  () => import("../../../../components/planning/thekkaKarKatti/CreateThekkaKarKattiComp"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Thekka Karkatti"} />
      <CreateThekkaKarKatti/>
    </>
  );
};

export default index;
