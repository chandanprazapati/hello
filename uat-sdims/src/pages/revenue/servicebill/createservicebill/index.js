import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateServiceBill = dynamic(
  () =>
    import(
      "../../../../components/revenue/controllers/serviceBill/CreateServiceBill"
    ),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Create Service Bill"} />
      <CreateServiceBill />
    </React.Fragment>
  );
};

