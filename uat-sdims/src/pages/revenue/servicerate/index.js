import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const ServiceRate = dynamic(
  () =>
    import("../../../components/revenue/controllers/serviceRate/ServiceRate"),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Service Rate"} />
      <ServiceRate />
    </React.Fragment>
  );
}
