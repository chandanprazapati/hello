import React from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../components/viewPage/ViewPage";
import dynamic from "next/dynamic";
const CreateServiceRateAccToFiscal = dynamic(
  () => import("../../../components/revenue/controllers/serviceRate/CreateServiceRateAccToFiscal"),
  {
    ssr: false,
  }
);
const index = () => {
  return (
    <ViewPage>
      <SeoOptimization title={"Service Rate Acc To fiscal"} />
      <CreateServiceRateAccToFiscal/>
    </ViewPage>
  );
};

export default index;
