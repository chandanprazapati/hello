import React from "react";
import CreateJobDescription from "../../../../components/employeeMaster/job/CreateJobDescription";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";

const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Create Job Description"} />
      <CreateJobDescription/>
    </ViewPage>
  );
};

export default index;
       