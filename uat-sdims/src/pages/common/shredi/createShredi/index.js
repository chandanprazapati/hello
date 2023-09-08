import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateShredi = dynamic(
  () => import("../../../../components/common/shredi/CreateShredi"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Shredi"} />
      <CreateShredi />
    </React.Fragment>
  );
}
