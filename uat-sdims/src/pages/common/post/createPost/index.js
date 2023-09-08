import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreatePost = dynamic(
  () => import("../../../../components/common/post/CreatePost"),
  { ssr: false }
);

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Create Post"} />
      <CreatePost />
    </React.Fragment>
  );
}
