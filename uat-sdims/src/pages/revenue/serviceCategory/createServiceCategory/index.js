import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateServiceCategory = dynamic(
  () =>
    import(
      "../../../../components/revenue/serviceCategory/CreateServiceCategory"
    ),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Service Category"} />
      <CreateServiceCategory />
    </React.Fragment>
  );
}
