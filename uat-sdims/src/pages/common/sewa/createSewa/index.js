import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateSewa = dynamic(
  () => import("../../../../components/common/sewa/CreateSewa"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Sewa"} />
      <CreateSewa />
    </React.Fragment>
  );
}
