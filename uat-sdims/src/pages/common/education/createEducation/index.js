import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateEducation = dynamic(
  () => import("../../../../components/common/education/CreateEducation"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Education"} />
      <CreateEducation />
    </React.Fragment>
  );
}
