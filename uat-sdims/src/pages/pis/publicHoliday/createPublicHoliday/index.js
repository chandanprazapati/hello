import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
const CreatePublicHoliday = dynamic(
  () => import("../../../../components/pis/publicHoliday/CreatePublicHoliday"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Public Holiday"} />
      <CreatePublicHoliday />
    </React.Fragment>
  );
}
