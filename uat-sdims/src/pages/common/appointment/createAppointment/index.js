import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateAppointment = dynamic(
  () => import("../../../../components/common/appointment/CreateAppointment"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Appointment"} />
      <CreateAppointment />
    </React.Fragment>
  );
}
