import React from "react";
import SeoOptimization from "../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const Dashboard = dynamic(
  () => import("../../components/dashboard/Dashboard"),
  { ssr: false }
);

// import Dashboard from "../../components/dashboard/Dashboard";

export default function Index() {
  return (
    <>
      <SeoOptimization title={"Dashboard"} />
      <Dashboard />
    </>
  );
}
