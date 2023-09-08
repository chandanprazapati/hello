import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const Employee = dynamic(
  () => import("../../../components/employeeMaster/employee/Employee"),
  { ssr: false }
);


export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Employee Setup "} />
      <Employee />
    </React.Fragment>
  );
}
