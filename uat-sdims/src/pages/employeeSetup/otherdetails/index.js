import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import OtherDetails from "../../../components/employeeMaster/other/OtherDetails";

const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={" Employee Other Details"} />
      <OtherDetails />
    </ViewPage>
  );
};

export default index;
