import React from 'react'
import dynamic from 'next/dynamic'
import SeoOptimization from '../../../../components/reusableDesign/SeoOptimzation'
const CreateRelation = dynamic(
  () => import("../../../../components/common/relation/CreateRelation"),
  { ssr: false }
);
export default function Index ()  {
  return (
    <React.Fragment>
      <SeoOptimization title={"Relation"}/>
        <CreateRelation/>
    </React.Fragment>
  )
}