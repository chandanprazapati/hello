import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const DiscountSchema = dynamic(
  () => import("../../../components/revenue/discountSchema/DiscountSchema"),
  {
    ssr: false,
  }
);
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Discount Schema"} />
      <DiscountSchema/>
    </ViewPage>
  );
};

export default index;
