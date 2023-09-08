import React from 'react'
import dynamic from 'next/dynamic'
import SeoOptimization from '../../../../components/reusableDesign/SeoOptimzation'

const CreateSubDepartment = dynamic(
  () => import('../../../../components/common/subDepartment/CreateSubDepartment'),
  { ssr: false }
)
const index = () => {
  return (
    <React.Fragment>
      <SeoOptimization title={"Sub Department"}/>
        <CreateSubDepartment/>
    </React.Fragment>
  )
}

export default index