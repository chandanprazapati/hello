import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateServiceRate = dynamic(
  () => import("../../../../components/revenue/controllers/serviceRate/CreateServiceRate"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Service Rate"} />
      <CreateServiceRate/>
    </React.Fragment>
  );
};

