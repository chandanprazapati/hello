import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const InvoiceCancelReason = dynamic(
  () =>
    import(
      "../../../components/revenue/invoiceCancelReason/InvoiceCancelReason"
    ),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Ivoice Cancel Reason"} />
      <InvoiceCancelReason />
    </React.Fragment>
  );
}
