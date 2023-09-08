import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateFiscal = dynamic(
  () => import("../../../../components/common/fiscal/CreateFiscal"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title="Create Fiscal" />
      <CreateFiscal />
    </React.Fragment>
  );
}
