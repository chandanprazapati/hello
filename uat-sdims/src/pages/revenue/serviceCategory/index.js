import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const ServiceCategory = dynamic(
  () => import("../../../components/revenue/serviceCategory/ServiceCategory"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Service Category"} />
      <ServiceCategory/>
    </React.Fragment>
  );
};

