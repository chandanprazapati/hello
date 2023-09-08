import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateEmployee = dynamic(
  () => import("../../../../components/employeeMaster/employee/CreateEmployee"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Employee"} />
      <CreateEmployee />
    </React.Fragment>
  );
}
