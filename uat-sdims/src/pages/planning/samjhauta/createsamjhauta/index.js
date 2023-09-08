import React from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
const CreateSamjhauta = dynamic(
  () => import("../../../../components/planning/samjhauta/CreateSamjhauta"),
  { ssr: false }
);
export default function Index() {
  return (
    <React.Fragment>
      <SeoOptimization title={"Samjhauta"} />
      <CreateSamjhauta />
    </React.Fragment>
  );
}



          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              value={contigencyAmount ? contigencyAmount : ""}
              placeholder="."
            />
            <label className="label">कन्टेन्जेंसी ({contigency} % )रुः</label>
          </div> */}