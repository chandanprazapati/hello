import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import CreateOtherDetails from "../../../../components/employeeMaster/other/CreateOtherDetails";

const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Employee Other Details"} />
      <CreateOtherDetails/>
    </ViewPage>
  );
};

export default index;
       