import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const SubDepartment = dynamic(
  () => import("../../../components/common/subDepartment/SubDepartment"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Sub Department"} />
      <SubDepartment />
    </React.Fragment>
  );
}
