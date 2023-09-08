import React from "react";
import ViewPage from "../../../../components/viewPage/ViewPage";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const SamjhautaSuchi = dynamic(
  () =>
    import(
      "../../../../components/planning/samjhautaSuchi/SamjhautaSuchi"
    ),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Samjhauta Suchi"} />
      <SamjhautaSuchi />
    </>
  );
};

export default index;
