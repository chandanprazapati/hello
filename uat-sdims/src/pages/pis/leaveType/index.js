import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const LeaveType = dynamic(
  () => import("../../../components/pis/leaveType/LeaveType"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Leave Type"} />
      <LeaveType />
    </React.Fragment>
  );
}
