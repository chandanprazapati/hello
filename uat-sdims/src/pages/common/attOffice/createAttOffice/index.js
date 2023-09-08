import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateAttOffice = dynamic(
  () => import("../../../../components/common/attOffice/CreateAttOffice"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Attendeance Office"} />
      <CreateAttOffice />
    </React.Fragment>
  );
}
