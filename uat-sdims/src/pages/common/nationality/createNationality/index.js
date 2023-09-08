import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateNationality = dynamic(
  () => import("../../../../components/common/nationality/CreateNationality"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Nationality"} />
      <CreateNationality />
    </React.Fragment>
  );
}
