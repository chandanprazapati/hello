import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateAttOfficeType = dynamic(
  () =>
    import("../../../../components/common/attOfficeType/CreateAttOfficeType"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title=" Attendeance Office Type" />
      <CreateAttOfficeType />
    </React.Fragment>
  );
}
