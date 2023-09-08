import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic"; 
const CreateUpavoktaSamiti = dynamic(
  () => import("../../../../components/planning/upavoktaSamiti/CreateUpavoktaSamiti"),
  { ssr: false }
);
const index = () => {
  return (
    <>
      <SeoOptimization title={"Upabhokta Samiti"} />
      <CreateUpavoktaSamiti/>
    </>
  );
};

export default index;
