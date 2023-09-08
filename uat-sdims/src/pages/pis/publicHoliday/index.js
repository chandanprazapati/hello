import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
const PublicHoliday = dynamic(
  () => import("../../../components/pis/publicHoliday/PublicHoliday"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Public Holiday"} />
      <PublicHoliday />
    </React.Fragment>
  );
}
