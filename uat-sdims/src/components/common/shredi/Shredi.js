import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { shredi } from "../../../services/apiServices/common/shredi/shrediService";
import LoadingSpinner from "../../reusableDesign/Loading";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";

export default function Shredi() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      shredi().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
            setLoading(false);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiData]);

  const handleEdit = useCallback(
    (id) => {
      router.push(`/common/shredi/createShredi/${id}`);
    },
    [router]
  );

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.rajPatrankitSheniId}</TableCell>
              <TableCell
                className="pl-7 cursor-pointer  hover:text-blue-900 "
                onClick={() => {
                  handleEdit(row.id);
                }}
              >
                <FaEdit size={20} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );

  return (
    <ListViewPageDesign>
      <ListHeader title="श्रेणी सूची" />
      <ListButton url="/common/shredi/createShredi" />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "सि.नं." },
  { id: "name", name: "नाम" },
  { id: "rajPatrankitSheniId", name: "राजपत्राङ्कित शेनी नं." },
  { id: "Action", name: "कार्य" },
];



  


//   return (
//     <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black  ">
//       <div className="text-4xl font-bold items-center flex justify-center pt-5  ">
//         क्षेडी सूची
//       </div>

//       <div className="flex justify-end ">
//         <div
//           onClick={() => {
//             router.push("/common/shredi/createShredi");
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

//       <hr className="mt-3" />
//       <br />
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow className="bg-[#3e8dc1fd]">
//                 <TableCell sx={{ fontSize: "20px" }}>name</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>
//                   rajPatrankitSheniId
//                 </TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {apiData.map((row, index) => {
//                 return (
//                   <TableRow key={index} className="hover:bg-[#a0cae7fd]">
//                     <TableCell>{row.name}</TableCell>

//                     <TableCell>{row.rajPatrankitSheniId}</TableCell>

//                     <TableCell
//                       className="pl-7 cursor-pointer hover:text-blue-900  "
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
// }
