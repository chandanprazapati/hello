import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreateInvoiceCancelReason = dynamic(
  () =>
    import(
      "../../../../components/revenue/invoiceCancelReason/CreateInvoiceCancelReason"
    ),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Invoice Cancel Reason"} />
      <CreateInvoiceCancelReason />
    </React.Fragment>
  );
}
