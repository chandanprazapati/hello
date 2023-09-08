import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateComplaintDetails = dynamic(
  ()=>import("../../../../components/complaint/complaintDetails/CreateComplaintDetails"),
  {ssr:false}
)

export default function Index  () {
  return (
    <React.Fragment>
      <SeoOptimization title={"Complaint Details"} />
      <CreateComplaintDetails />
    </React.Fragment>
  );
};

