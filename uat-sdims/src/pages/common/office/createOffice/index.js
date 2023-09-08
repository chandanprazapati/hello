import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateOffice = dynamic(
  () => import("../../../../components/common/office/CreateOffice"),
  { ssr: false }
);

export default function createOfficepage() {
  return (
    <React.Fragment>
      <SeoOptimization title="Create Office" />
      <CreateOffice />
    </React.Fragment>
  );
}
