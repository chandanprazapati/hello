import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateOld = dynamic(
  () => import("../../../../components/common/oldVdc/CreateOldVdc"),
  { ssr: false }
);
export default function createOffice() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Old Vdc"} />
      <CreateOld />
    </React.Fragment>
  );
}
