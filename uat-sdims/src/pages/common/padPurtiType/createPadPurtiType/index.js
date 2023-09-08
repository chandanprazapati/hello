import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreatePadPurti = dynamic(
  () => import("../../../../components/common/padPurtiType/CreatePadPurtiType"),
  { ssr: false }
);
export default function Index () {
  return (
    <React.Fragment>
      <SeoOptimization title={" Padpurti"} />
      <CreatePadPurti />
    </React.Fragment>
  );
};

