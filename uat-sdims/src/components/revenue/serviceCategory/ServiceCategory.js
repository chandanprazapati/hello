import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { serviceCategory } from "../../../services/apiServices/revenue/serviceCategory/serviceCategoryService";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";
import LoadingSpinner from "../../reusableDesign/Loading";

export default function ServiceCategory() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let serviceCategoryApiData = () => {
      serviceCategory().then((response) => {
        try {
          response.status === true;
          {
            setApiData(response.data);
            setLoading(false);
          }
        } catch (error) {
          toast.error(response.message, {
            autoClose: 1000,
          });
        }
      });
    };
    serviceCategoryApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/revenue/serviceCategory/createServiceCategory/${id}`);
  };

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => (
          <TableRow key={index} className="hover:bg-[#a0cae7fd]">
            <TableCell>{englishToNepali(index + 1)}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell
              className="pl-7 cursor-pointer hover:text-blue-900"
              onClick={() => {
                handleEdit(row.id);
              }}
            >
              <FaEdit size={20} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );

  return (
    <ListViewPageDesign>
      <ListHeader title="सेवा-वर्ग  सूची" />
      <ListButton url={`/revenue/serviceCategory/createServiceCategory`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "सि.नं." },
  { id: "name", name: "नाम" },
  { id: "Action", name: "कार्य" },
];

//   return (
//                    <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black  ">

//       <div className="text-4xl font-bold items-center flex justify-center pt-5  ">
//         सेवा-वर्ग सूची
//       </div>

//       <div className="flex justify-end ">
//         <div
//           onClick={() => {
//             router.push("/revenue/servicecategory/createservicecategory");
//           }}
//           className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer "
//         >
//           <div className="pt-1">
//             <FaPlus />
//           </div>
//           <button type="submit" className="text-sm font-extralight ">
//             नयाँ थप्नुहोस्
//           </button>
//         </div>
//       </div>

//       <hr />
//       {loading ? (
//         <div className="flex flex-col justify-center items-center w-full h-full">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
//           {/* loading text */}
//           <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
//             Loading...
//           </div>
//         </div>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//                         <TableRow className="bg-[#3e8dc1fd]">
//                 <TableCell sx={{ fontSize: "20px" }}> सि.न. </TableCell>

//                 <TableCell sx={{ fontSize: "20px" }}>नाम</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>कोड</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>सेवा वर्ग</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>
//                   श्रेणी को प्रकृति
//                 </TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>कार्य</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {apiData.map((row, index) => {
//                 return (
//                                   <TableRow
//                   key={index}
//                   className="hover:bg-[#a0cae7fd]"
//                 >

//                     <TableCell component="th" scope="row">
//                       {index + 1}
//                     </TableCell>
//                     <TableCell>{row.name}</TableCell>

//                     <TableCell>{row.code}</TableCell>
//                     <TableCell>{row.parentId}</TableCell>

//                     <TableCell>{row.natureOfCategoryId}</TableCell>

//                     <TableCell
//                       className="pl-7 cursor-pointer hover:text-blue-900 "
//                       onClick={() => {
//                         handleEdit(row.id);
//                       }}
//                     >
//                       <FaEdit size={20} />
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };
