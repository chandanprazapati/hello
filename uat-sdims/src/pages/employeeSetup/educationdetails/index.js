import React from "react";
import EducationalDetails from "../../../components/employeeMaster/educational/EducationalDetails";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";

const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Employee Education Details "} />
      <EducationalDetails/>
    </ViewPage>
  );
};

export default index;
