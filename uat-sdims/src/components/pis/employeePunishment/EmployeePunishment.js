import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { employeePunishment } from "../../../services/apiServices/pis/employeePunishment/employeePunishmentService";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListButton from "../../reusableDesign/ListButton";
import LoadingSpinner from "../../reusableDesign/Loading";
import ListHeader from "../../reusableDesign/ListHeader";

export default function EmployeePunishment() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let employeePunishmentApiData = () => {
      employeePunishment().then((response) => {
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
    employeePunishmentApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/pis/employeePunishment/createEmployeePunishment/${id}`);
  };

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>{row.employeeId}</TableCell>
              <TableCell>{row.postId}</TableCell>
              <TableCell>{englishToNepali(row.startDateNep)}</TableCell>
              <TableCell>{englishToNepali(row.endDateNep)}</TableCell>
              <TableCell>{row.decisionOrganization}</TableCell>
              <TableCell>{englishToNepali(row.decisionDateNep)}</TableCell>
              <TableCell>{englishToNepali(row.period)}</TableCell>
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
      <ListHeader title="कर्मचारी सजाय विवरण सूची" />
      <ListButton url={`/pis/employeePunishment/createEmployeePunishment`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "employeeId", name: "कर्मचारी" },
  { id: "postId", name: "पद" },
  { id: "startDateNep", name: "सजाय लागु मिति" },
  { id: "endDateNep", name: "सजाय समाप्त मिति" },
  { id: "decisionOrganization", name: "निर्णय गर्ने संस्था" },
  { id: "decisionDateNep", name: "निर्णय मिति" },
  { id: "period", name: "अवधि" },
  { id: "edit", name: "कार्य" },
];
