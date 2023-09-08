import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateRajPatrankitSheni = dynamic(
  () =>
    import(
      "../../../../components/common/rajPatrankitSheni/CreateRajPatrankitSheni"
    ),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Create RajPatrankitSheni"} />
      <CreateRajPatrankitSheni />
    </React.Fragment>
  );
}
