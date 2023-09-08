import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreatePreviousOfficeRecord = dynamic(
  () =>
    import("../../../../components/pis/previousOffice/CreatePreviousOffice"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Create Previous Office"} />
      <CreatePreviousOfficeRecord />
    </React.Fragment>
  );
}
