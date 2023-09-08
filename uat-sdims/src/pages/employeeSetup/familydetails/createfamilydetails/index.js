import React from "react";
import CreateEmployee from "../../../../components/employeeMaster/employee/CreateEmployee";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import CreateFamilyDetails from "../../../../components/employeeMaster/family/CreateFamilyDetails";

const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Family Details"} />
      <CreateFamilyDetails/>
    </ViewPage>
  );
};

export default index;
       