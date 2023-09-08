import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const HouseRentType = dynamic(
  () => import("../../../components/revenue/houseRentType/HouseRentType"),
  {
    ssr: false,
  }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"House Rent"} />
      <HouseRentType />
    </React.Fragment>
  );
}
