import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateDiscountSchema = dynamic(
  () => import("../../../../components/revenue/discountSchema/CreateDiscountSchema"),
  {
    ssr: false,
  }
);
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Discount Schema"} />
      <CreateDiscountSchema/>
    </ViewPage>
  );
};

export default index;
