import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const RegisterUser = dynamic(
  () => import("../../../../components/employeeMaster/user/RegisterUser"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Register User"} />
      <RegisterUser />
    </React.Fragment>
  );
}
