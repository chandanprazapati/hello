import Image from 'next/image'
import React from 'react'
import bidya from "../../../../../public/assets/bidhya.png"
const TeamsCardDesign = () => {
  return (
    <div>
        <div className='bg-red-300  w-1/4 border-2  mt-5 ml-5 shadow-lg hover:border-dotted' >
            <Image src ={bidya} alt={"owner"} width={1000} height={100} />
        </div>
    </div>
  )
}

export default TeamsCardDesign