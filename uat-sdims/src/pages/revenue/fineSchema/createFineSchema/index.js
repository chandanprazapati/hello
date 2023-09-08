import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateFineSchema = dynamic(
  () =>
    import("../../../../components/revenue/fineSchema/CreateFine"),
  {
    ssr: false,
  }
);
export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Fine Schema"} />
      <CreateFineSchema/>
    </React.Fragment>
  );
};

