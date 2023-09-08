import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { sewalog } from "../../../services/apiServices/pis/sewalog/sewalogService";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";
import LoadingSpinner from "../../reusableDesign/Loading";

export default function Sewalog() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sewalogApiData = () => {
      sewalog().then((response) => {
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
    sewalogApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/pis/sewalog/createSewalog/${id}`);
  };

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell component="th" scope="row">
                {englishToNepali(index + 1)}
              </TableCell>
              <TableCell>{row.employeeName}</TableCell>
              <TableCell>{row.postName}</TableCell>
              <TableCell>{row.sewaParimanName}</TableCell>

              <TableCell>{englishToNepali(row.nirnamyMiti)}</TableCell>
              <TableCell>{englishToNepali(row.laguMiti)}</TableCell>
              <TableCell>{englishToNepali(row.hajiriMiti)}</TableCell>
              

              <TableCell className="pl-7 cursor-pointer ">
                <div className="flex gap-10 ">
                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handleEdit(row.id);
                    }}
                  >
                    <FaEdit size={20} />
                  </div>
                  <div
                    className="hover:text-red-700"
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                  >
                    <FaTrashAlt size={20} />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );

  return (
    <ListViewPageDesign>
      <ListHeader title="सेवा लग सूची" />
      <ListButton url={`/pis/sewalog/createSewalog`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "employeeName", name: "कर्मचारी" },
  { id: "postId", name: "पद" },
  { id: "sewaParimanName", name: "सेवा परिमाण" },
  { id: "nirnamyMiti", name: "निर्णाम्य मिति" },
  { id: "laguMiti", name: "लगु मिति" },
  { id: "hajiriMiti", name: "हाजिरी मिति" },
  { id: "action", name: "कार्य" },
];

//   return (
//     <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black  ">
//       <div className="text-4xl font-bold items-center flex justify-center pt-5  ">
//         सेवा लग सूची
//       </div>

//       <div className="flex justify-end ">
//         <div
//           onClick={() => {
//             router.push("/pis/sewalog/createSewalog");
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

//       <hr className = "mt-3"/>
//       <br />
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
//               <TableRow className="bg-[#3e8dc1fd]">
//                 <TableCell sx={{ fontSize: "20px" }}>सि.नं</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}> कर्मचारी</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>पद</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>सेवा परिमाण</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>निर्णय मिति </TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>लागू मिति </TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>
//                   कार्यालय हाजिरी मिति
//                 </TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>कार्यालय</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>कार्य</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {apiData.map((row, index) => {
//                 return (
//                   <TableRow key={index} className="hover:bg-[#a0cae7fd]">
//                     <TableCell component="th" scope="row">
//                       {index + 1}
//                     </TableCell>
//                     <TableCell>{row.employeeName}</TableCell>
//                     <TableCell>{row.postId}</TableCell>
//                     <TableCell>{row.sewaParimanName}</TableCell>

//                     <TableCell>{row.nirnamyMiti}</TableCell>
//                     <TableCell>{row.laguMiti}</TableCell>
//                     <TableCell>{row.hajiriMiti}</TableCell>
//                     <TableCell>{row.officeName}</TableCell>

//                     <TableCell className="pl-7 cursor-pointer ">
//                       <div className="flex gap-10 ">
//                         <div
//                           className=" cursor-pointer hover:text-blue-900 "
//                           onClick={() => {
//                             handleEdit(row.id);
//                           }}
//                         >
//                           <FaEdit size={20} />
//                         </div>
//                         <div
//                           className="hover:text-red-700"
//                           onClick={() => {
//                             handleDelete(row.id);
//                           }}
//                         >
//                           <FaTrashAlt size={20} />
//                         </div>
//                       </div>
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
