import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { deactiveEmployee } from "../../../services/apiServices/pis/deactiveEmployee/deactiveEmployeeService";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
import ListButton from "../../reusableDesign/ListButton";
import ListHeader from "../../reusableDesign/ListHeader";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import LoadingSpinner from "../../reusableDesign/Loading";

export default function DeactiveEmployee  ()  {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "apiData");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let deactiveEmployeeApiData = () => {
      deactiveEmployee().then((response) => {
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
    deactiveEmployeeApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/pis/deactiveEmployee/createDeactiveEmployee/${id}`);
  };



  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">

              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>{row.employeeId}</TableCell>
              <TableCell> {row.deactiveSewaparimanId} </TableCell>
              <TableCell>{englishToNepali(row.deactiveDateNep)}</TableCell>
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
      <ListHeader title="विभूषण/सम्मान विवरण  सूची" />
      <ListButton url={`/pis/deactiveEmployee/createDeactiveEmployee`} />
      {loading ? <LoadingSpinner/> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "employeeId", name: "कर्मचारी आईडी" },
  { id: "deactiveSewaparimanId", name: "निष्क्रिय सेवापरिमाण आईडी" },
  { id: "deactiveDateNep", name: "निष्क्रिय मिति" },
  { id: "action", name: "कार्य" },
];


