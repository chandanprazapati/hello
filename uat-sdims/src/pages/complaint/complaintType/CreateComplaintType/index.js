import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateComplaintType = dynamic(
  () =>
    import(
      "../../../../components/complaint/complaintType/CreateComplaintType"
    ),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Complaint Type"} />
      <CreateComplaintType />
    </React.Fragment>
  );
}
