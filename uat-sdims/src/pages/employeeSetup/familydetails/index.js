import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import FamilyDetails from "../../../components/employeeMaster/family/FamilyDetails";

const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Employee Family Details "} />
      <FamilyDetails />
    </ViewPage>
  );
};

export default index;
