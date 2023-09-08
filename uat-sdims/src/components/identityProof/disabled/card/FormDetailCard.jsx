import React, { useEffect, useState } from 'react'


const FormDetailCard = () => {
    // get the data from the local storage
    const [data, setData] = useState({})

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userData'));
        setData(data);
    }, [data]);

    return (
        <>

            <div>
                <div className='bg-gray-500 rounded-xl'>
                    <h1 className='flex justify-center py-2 font-normal tracking-wider text-white '>Form Detail Card</h1>
                </div>
                {/* detail card design */}
                {
                    data?.firstName ?
                        <div className='px-4 flex flex-col bg-gray-300'>
                            <h2 className='py-2 font-serif text-lg'>Personal Details:</h2>
                            <div
                                className="flex-auto border-t-2 transition duration-500 ease-in-out  border-orange-300 "
                            ></div>
                            <div className='flex gap-4 p-2 bg-sky-100 my-2 rounded'>
                                <p className='font-thin'>First Name: <span className='font-normal'>{data.firstName}</span> </p>
                                <p className='font-thin'>Last Name: <span className='font-normal'>{data.lastName}</span> </p>
                                <p className='font-thin'>Email: <span className='font-normal'>{data.email}</span> </p>
                            </div>
                        </div>
                        : null
                }
                {/* end of detail card */}

                {/* start of address detail  */}

                {
                    data?.addressLine1 ?
                        <div className='px-4 flex flex-col bg-gray-300'>
                            <h2 className='py-2 font-serif text-lg'>Address Details:</h2>
                            <div
                                className="flex-auto border-t-2 transition duration-500 ease-in-out  border-orange-300 "
                            ></div>
                            <div className='flex gap-4 p-2 bg-sky-100 my-2 rounded'>
                                <p className='font-thin'>First Name: <span className='font-normal'>{data.firstName}</span> </p>
                                <p className='font-thin'>Last Name: <span className='font-normal'>{data.lastName}</span> </p>
                                <p className='font-thin'>Email: <span className='font-normal'>{data.email}</span> </p>
                            </div>
                        </div>
                        : null
                }
                {/* end of address detail */}

                {/* start of address detail  */}

                {
                    data?.schoolName ?
                        <div className='px-4 flex flex-col bg-gray-300'>
                            <h2 className='py-2 font-serif text-lg'>Education Details:</h2>
                            <div
                                className="flex-auto border-t-2 transition duration-500 ease-in-out  border-orange-300 "
                            ></div>
                            <div className='flex gap-4 p-2 bg-sky-100 my-2 rounded'>
                                <p className='font-thin'>First Name: <span className='font-normal'>{data.firstName}</span> </p>
                                <p className='font-thin'>Last Name: <span className='font-normal'>{data.lastName}</span> </p>
                                <p className='font-thin'>Email: <span className='font-normal'>{data.email}</span> </p>
                            </div>
                        </div>
                        : null
                }
                {/* end of address detail */}


            </div>

        </>
    )
}

export default FormDetailCard