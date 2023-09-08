import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const EmployeePunishment = dynamic(
  () => import("../../../components/pis/employeePunishment/EmployeePunishment"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Employee Punishment"} />
      <EmployeePunishment />
    </React.Fragment>
  );
}
