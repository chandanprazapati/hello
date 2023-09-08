import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateLeaveType = dynamic(
  () => import("../../../../components/pis/leaveType/CreateLeaveType"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Leave Type"} />
      <CreateLeaveType />
    </React.Fragment>
  );
}
