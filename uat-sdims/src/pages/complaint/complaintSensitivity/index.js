import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const ComplaintSensitivity = dynamic(
  () =>
    import("../../../components/complaint/complaintSensitivity/ComplaintSensitivity"),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Complaint Sensitivity"} />
      <ComplaintSensitivity />
    </React.Fragment>
  );
}
