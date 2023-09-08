import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateHouseRentType = dynamic(
  () =>
    import("../../../../components/revenue/houseRentType/CreateHouseRentType"),
  {
    ssr: false,
  }
);

export default function Index  ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"House Rent"} />
      <CreateHouseRentType />
    </React.Fragment>
  );
};

