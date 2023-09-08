import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateSewaParimad = dynamic(
  () => import("../../../../components/common/sewaParimad/CreateSewaParimad"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Sewa Parimad"} />
      <CreateSewaParimad />
    </React.Fragment>
  );
}
