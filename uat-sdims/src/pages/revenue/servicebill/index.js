import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const ServiceBill = dynamic(
  () => import("../../../components/revenue/controllers/serviceBill/ServiceBill"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Service Bill"} />
      <ServiceBill/>
    </React.Fragment>
  );
};

