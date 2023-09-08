import React from "react";
import CreateEmployee from "../../../../components/employeeMaster/employee/CreateEmployee";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";

const index = () => {
  return (
    <React.Fragment>
      <SeoOptimization title={" Employee Education Details "} />
      <CreateEmployee/>
    </React.Fragment>
  );
};

export default index;
       