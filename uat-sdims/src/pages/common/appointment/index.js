import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const Appointment = dynamic(
  () => import("../../../components/common/appointment/Appointment"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Appointment"} />
      <Appointment />
    </React.Fragment>
  );
}
