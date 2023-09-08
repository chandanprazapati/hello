import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateGroup = dynamic(
  () => import("../../../../components/common/group/CreateGroup"),
  { ssr: false }
);

export default function Index ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Group"} />
      <CreateGroup />
    </React.Fragment>
  );
};

