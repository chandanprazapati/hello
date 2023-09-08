import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateDepartment = dynamic(
  () => import("../../../../components/common/department/CreateDepartment"),
  { ssr: false }
);

export default function Index() {
  return (
    <>
      <SeoOptimization title={" Department"} />
      <CreateDepartment />
    </>
  );
}
