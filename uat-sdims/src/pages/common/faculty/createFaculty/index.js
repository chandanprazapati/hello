import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateFaculty = dynamic(
  () => import("../../../../components/common/faculty/CreateFaculty"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={" Faculty"} />
      <CreateFaculty />
    </React.Fragment>
  );
}
