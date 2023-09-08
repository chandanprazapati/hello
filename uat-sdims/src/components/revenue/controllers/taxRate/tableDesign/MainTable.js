import React from 'react'
import Table from '../tableDesign/Table'

const MainTable = () => {
    return (
        <>
            <Table thead={tableHeads} />
        </>

    )
}

export default MainTable

const tableHeads = [
    {
        id: 1,
        name: "S.No",
        width: "w-1/4"
    },
    {
        id: 2,
        name: "Tax Sub Category",
        width: "w-1/2"
    },
    {
        id: 3,
        name: "Name",
        width: "w-1/2"
    },
    {
        id: 4,
        name: "Code",
        width: "w-1/2"
    },
    {
        id: 5,
        name: "Rate",
        width: "w-1/2"
    },{
        id: 6,
        name: "New Rate",
        width: "w-1/2"
    },
    {
        id: 7,
        name: "Action",
        width: "w-1/4"
    }
]