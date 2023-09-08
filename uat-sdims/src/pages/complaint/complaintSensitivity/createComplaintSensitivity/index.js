import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateComplaintSensitivity = dynamic(
  ()=>import("../../../../components/complaint/complaintSensitivity/CreateComplaintSensitivity"),
  {ssr:false}
)

const index = () => {
  return (
    <React.Fragment>
      <SeoOptimization title={"Complaint Sensitivity"} />
      <CreateComplaintSensitivity />
    </React.Fragment>
  );
};

export default index;
