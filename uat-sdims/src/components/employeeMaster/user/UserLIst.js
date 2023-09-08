import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";
import LoadingSpinner from "../../reusableDesign/Loading";
import { englishToNepali } from "../../../utils/utility";
import { getAllUser } from "../../../services/apiServices/employee/user/userService";

export default function UserList() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userListApiData = () => {
      getAllUser().then((response) => {
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
    userListApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/employeeSetup/user/registerUser/${id}`);
  };

  const loacale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.ward}</TableCell>

              <TableCell>{row.role}</TableCell>
              <TableCell>{String(row.status)}</TableCell>
              {/* <TableCell
                className="pl-7 cursor-pointer hover:text-blue-900  "
                onClick={() => {
                  handleEdit(row.id);
                }}
              >
                <FaEdit size={20} />
              </TableCell> */}
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );

  return (
    <ListViewPageDesign>
      <ListHeader title="कर्मचारी प्रयोगकर्ता दर्ता सूची" />
      <ListButton url={`/employeeSetup/user/registerUser`} />
      {loading ? <LoadingSpinner /> : loacale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "name", name: "  नाम" },
  { id: "email", name: "ईमेल" },
  { id: "ward", name: "वार्ड" },
  { id: "role", name: "भूमिका" },
  { id: "status", name: "स्थिति" },
];
