import React from "react";
import JobDescription from "../../../components/employeeMaster/job/JobDescription";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";

const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Job Description "} />
      <JobDescription />
    </ViewPage>
  );
};

export default index;
