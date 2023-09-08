import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateBhuktaniType = dynamic(
  () => import("../../../../components/planning/bhuktaniType/CreateBhuktaniType"),
  { ssr: false }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Bhuktani"} />
      <CreateBhuktaniType/>
    </React.Fragment>
  );
};

