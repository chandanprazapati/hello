import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const FineSchema = dynamic(
  () => import("../../../components/revenue/fineSchema/FineSchema"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Fine Schema"} />
      <FineSchema/>
    </React.Fragment>
  );
};

