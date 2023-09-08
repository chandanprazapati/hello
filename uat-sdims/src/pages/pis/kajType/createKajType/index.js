import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateKajType = dynamic(
  () => import("../../../../components/pis/kajType/CreateKajType"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Kaj Type"} />
      <CreateKajType />
    </React.Fragment>
  );
}
