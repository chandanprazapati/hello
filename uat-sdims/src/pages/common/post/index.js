import React from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

const Post = dynamic(() => import("../../../components/common/post/Post"), {
  ssr: false,
});

export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Post"} />
      <Post />
    </React.Fragment>
  );
}
