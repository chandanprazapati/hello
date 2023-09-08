import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateCast = dynamic(
  () => import("../../../../components/common/cast/CreateCast"),
  { ssr: false }
);
const index = () => {
  return (
    <React.Fragment>
      <SeoOptimization title={"Cast"} />
      <CreateCast />
    </React.Fragment>
  );
};

export default index;
