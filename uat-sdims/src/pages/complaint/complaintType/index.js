import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const ComplaintType = dynamic(
  () =>
    import("../../../components/complaint/complaintType/ComplaintType"),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Complaint Type"} />
      <ComplaintType />
    </React.Fragment>
  );
}
