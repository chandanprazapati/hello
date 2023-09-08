import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateEmployeePunishment = dynamic(
  () => import("../../../../components/pis/employeePunishment/CreateEmployeePunishment"),
  { ssr: false }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Employee Punishment"} />
      <CreateEmployeePunishment/>
    </React.Fragment>
  );
};

