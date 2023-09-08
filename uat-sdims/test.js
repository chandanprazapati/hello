











// import React, { useEffect, useState } from 'react'
// import { FaPlus } from 'react-icons/fa';
// import { GrAddCircle } from 'react-icons/gr'
// import CommonHeaderDesign from '../../../../reusableDesign/CommonHeaderDesign';
// const Table = ({ thead }) => {
//     const [tableData, setTableData] = useState([])
//     console.log(tableData,"table");

//     const addTableRow = () => {
//         setTableData([...tableData, {}]);
//     };



//     const AddTableRowButton = () => {
//         return (
//             <button
//                 onClick={addTableRow}
//                 className="bg-sky-600 hover:bg-blue-700 text-white font-bold p-2 rounded-full flex gap-1 "
//             >
//                 <GrAddCircle color='white' className='flex justify-center pt-1' size={20} />
//                 <div>
//                 click here to add field
//                 </div>
//             </button>
//         );
//     };

//     // const handleSubmit = (data) => {
//     //     console.log(data,"data");
//     //     return new Promise((resolve) => {
//     //       setTimeout(() => {
//             // if (taxSubCategoryValue === "" ){
//             //   console.log(taxSubCategoryValue);
//             //   setTaxSubCategoryMsg(<p>This field is required</p>)
//             // }
//             // else{
//             //     data = {
//             //       taxRates : [
//             //         {
//             //           ...data , 
//             //           taxSubCategoryId : taxSubCategoryValue
//             //         }
      
//             //       ]
//             //     }
                
//             // }
            
    
//     //         try {
//     //           createIndexTaxRate(data).then((response) => {
//     //             if (response.status === true) {
//     //               toast.success(response.message, {
//     //                 icon: "🚀",
//     //                 autoClose: 1000,
//     //               });
//     //               router.push("/revenue/indextaxrate");
//     //               return;
//     //             } else response.status === false;
//     //             {
//     //               toast.error(response.message, {
//     //                 icon: "🚀",
//     //                 autoClose: 1000,
//     //               });
//     //             }
//     //             return;
//     //           });
//     //         } catch (error) {}
//     //         resolve();
//     //       }, 2000);
//     //     });
//     //   };




//     return (
//         <>
//       <CommonHeaderDesign title={"Create Tax Rate"} />

//             {/* need this button float in right side  */}
//             <div className="flex justify-end py-3">
//                 <AddTableRowButton />
//             </div>


//             <table className="table-fixed w-full">
//                 <thead>
//                     {
//                         thead.map((head, index) => (
//                             <th key={index} className={`border bg-gray-300 px-4 py-2 ${head.width}`}>
//                                 {head.name}
//                             </th>
//                         ))
//                     }
//                 </thead>
//                 <tbody>
//                     {tableData.map((rowData, index) => (
//                         <tr key={index} className="bg-white">
//                               <td className="border px-4 py-2">
//                                 <input
//                                     type="text"
//                                     value={index+1}
                                   
//                                     className="border-gray-300 border-2 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                     placeholder="Name"
//                                 />
//                             </td>
//                             <td className="border px-4 py-2">
//                                 <input
//                                     type="text"
//                                     value={rowData.name || ""}
//                                     onChange={(event) =>
//                                         setTableData([
//                                             ...tableData.slice(0, index),
//                                             { ...rowData, name: event.target.value },
//                                             ...tableData.slice(index + 1),
//                                         ])
//                                     }
//                                     className="border-gray-300 border-2 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                     placeholder="Email"
//                                 />
//                             </td>
//                             <td className="border px-4 py-2">
//                                 <input
//                                     type="text"
//                                     value={rowData.name || ""}
//                                     onChange={(event) =>
//                                         setTableData([
//                                             ...tableData.slice(0, index),
//                                             { ...rowData, name: event.target.value },
//                                             ...tableData.slice(index + 1),
//                                         ])
//                                     }
//                                     className="border-gray-300 border-2 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                     placeholder="Enter Username"
//                                 />
//                             </td>
//                             <td className="border px-4 py-2">
//                                 <input
//                                     type="text"
//                                     value={rowData.code || ""}
//                                     onChange={(event) =>
//                                         setTableData([
//                                             ...tableData.slice(0, index),
//                                             { ...rowData, code: event.target.value },
//                                             ...tableData.slice(index + 1),
//                                         ])
//                                     }
//                                     className="border-gray-300 border-2 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                     placeholder="Enter Code"
//                                 />
//                             </td>
//                             <td className="border px-4 py-2">
//                                 <input
//                                     type="text"
//                                     value={rowData.rate || ""}
//                                     onChange={(event) =>
//                                         setTableData([
//                                             ...tableData.slice(0, index),
//                                             { ...rowData, rate: event.target.value },
//                                             ...tableData.slice(index + 1),
//                                         ])
//                                     }
//                                     className="border-gray-300 border-2 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                     placeholder="Enter Tax Rate"
//                                 />
//                             </td>
//                             <td className="border px-4 py-2">
//                                 <input
//                                     type="text"
//                                     value={rowData.newRate || ""}
//                                     onChange={(event) =>
//                                         setTableData([
//                                             ...tableData.slice(0, index),
//                                             { ...rowData, newRate: event.target.value },
//                                             ...tableData.slice(index + 1),
//                                         ])
//                                     }
//                                     className="border-gray-300 border-2 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                     placeholder="Enter Tax New Rate"
//                                 />
//                             </td>
//                             {/* here is action button delete and add */}
//                             <td className="border pl-6 ">
                                
//                                 <button
//                                     onClick={() => {
//                                         setTableData([
//                                             ...tableData.slice(0, index),
//                                             ...tableData.slice(index + 1),
//                                         ]);
//                                     }}
//                                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
//                                 >
//                                     Delete
//                                 </button>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* <div className="flex justify-end pt-4 ">
//           <div className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer ">
//             <div className="pt-1">
//               <FaPlus />
//             </div>
//             <button
//               type="submit"
//               className="text-sm font-extralight "
//               onClick={handleSubmit}
//             >
//               { "Add Tax Rate"}
//             </button>
//           </div>
//         </div> */}
//         </>
//     )
// }

// export default Table

