import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const DocumentType = dynamic(
  () => import("../../../components/planning/documentType/DocumentType"),
  { ssr: false }
);

const index = () => {
  return (
    <>
      <SeoOptimization title={"Document"} />
      <DocumentType />
    </>
  );
};

export default index;
