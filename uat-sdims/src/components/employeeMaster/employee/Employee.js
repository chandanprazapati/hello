import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";
import LoadingSpinner from "../../reusableDesign/Loading";
import { englishToNepali } from "../../../utils/utility";

export default function Employee() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let employeeApiData = () => {
      employee().then((response) => {
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
    employeeApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/employeeSetup/employee/createEmployee/${id}`);
  };

  const loacale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>
                {row.firstName} {row.middleName} {row.lastName} [
                {englishToNepali(row.empCode)}]
              </TableCell>
              <TableCell>{englishToNepali(row.citizenNo)}</TableCell>
              <TableCell>{englishToNepali(row.mobileNo)}</TableCell>
              <TableCell
                className="pl-7 cursor-pointer hover:text-blue-900  "
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
      <ListHeader title="कर्मचारी सूची" />
      <ListButton url={`/employeeSetup/employee/createEmployee`} />
      {loading ? <LoadingSpinner /> : loacale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "name", name: " कर्मचारी नाम" },
  { id: "citizenNo", name: "नागरिकता नं" },
  { id: "mobileNo", name: "सम्पर्क नं" },
  { id: "action", name: "कार्य" },
];
