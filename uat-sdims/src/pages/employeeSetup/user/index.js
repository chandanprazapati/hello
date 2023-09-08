import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const UserLIst = dynamic(
  () => import("../../../components/employeeMaster/user/UserLIst"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Register User "} />
      <UserLIst />
    </React.Fragment>
  );
}
