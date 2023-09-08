import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const SamjhautaGaripauReceipt = dynamic(
  () =>
    import(
      "../../../../components/planning/samjhautaGaripau/SamjhautaGaripauReceipt"
    ),
  { ssr: false }
);

const index = () => {
  return (
    <>
      <SeoOptimization title={"Samjhauta Garipau"} />
      <SamjhautaGaripauReceipt />
    </>
  );
};

export default index;
