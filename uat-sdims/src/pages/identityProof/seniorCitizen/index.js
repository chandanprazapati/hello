import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const JesthNagrik = dynamic(
  () => import("../../../components/identityProof/jesthaNagrik/JesthNagrik"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Senior Citizen"} />
      <JesthNagrik />
    </React.Fragment>
  );
}
