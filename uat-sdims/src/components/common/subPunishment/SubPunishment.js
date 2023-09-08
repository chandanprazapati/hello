import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { subPunishment } from "../../../services/apiServices/common/subPunishment/subPunishmentService";
import LoadingSpinner from "../../reusableDesign/Loading";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";

export default function SubPunishment() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "apiData");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      subPunishment().then(({ status, data, message }) => {
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
      router.push(`/common/subPunishment/createSubPunishment/${id}`);
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
              <TableCell>{row.punishmentId}</TableCell>
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
      <ListHeader title="उप-सजाय सूची" />
      <ListButton url="/common/subPunishment/createSubPunishment" />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "सि.नं." },
  { id: "name", name: "नाम" },
  { id: "punishmentId", name: "सजायको नाम" },
  { id: "Action", name: "कार्य" },
];

//   return (
//     <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black  ">
//       <div className="text-4xl font-bold items-center flex justify-center pt-5  ">
//         उप-सजाय सूची
//       </div>

//       <div className="flex justify-end ">
//         <div
//           onClick={() => {
//             router.push("/common/subPunishment/createSubPunishment");
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
//         <LoadingSpinner />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow className="bg-[#3e8dc1fd]">
//                 <TableCell sx={{ fontSize: "20px" }}>name</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>Punishment Name</TableCell>
//                 <TableCell sx={{ fontSize: "20px" }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {apiData.map((row, index) => {
//                 return (
//                   <TableRow key={index} className="hover:bg-[#a0cae7fd]">
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>{row.punishmentId}</TableCell>

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
// }
