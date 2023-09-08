import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateSewalog = dynamic(
  () => import("../../../../components/pis/sewalog/CreateSewalog"),
  { ssr: false }
);

const index = () => {
  return (
    <React.Fragment>
      <SeoOptimization title={"Sewalog"} />
      <CreateSewalog />
    </React.Fragment>
  );
};

export default index;
