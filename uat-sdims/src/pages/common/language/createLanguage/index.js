import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateLanguage = dynamic(
  () => import("../../../../components/common/language/CreateLanguage"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={" Language"} />
      <CreateLanguage />
    </React.Fragment>
  );
}
