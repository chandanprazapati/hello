import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateDeactiveEmployee = dynamic(
  () =>
    import(
      "../../../../components/pis/deactiveEmployee/CreateDeactiveEmployee"
    ),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={" Deactive Employee"} />
      <CreateDeactiveEmployee />
    </React.Fragment>
  );
}
