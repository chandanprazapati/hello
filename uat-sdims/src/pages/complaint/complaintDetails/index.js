import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const ComplaintDetails = dynamic(
  () =>
    import("../../../components/complaint/complaintDetails/ComplaintDetails"),
  {
    ssr: false,
  }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Appointment"} />
      <ComplaintDetails />
    </React.Fragment>
  );
}
