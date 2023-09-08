import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "../../reusableDesign/Loading";
import { leaveType } from "../../../services/apiServices/pis/leaveType/leaveTypeService";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
import ListButton from "../../reusableDesign/ListButton";
export default function LeaveType() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      leaveType().then(({ status, data, message }) => {
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
      router.push(`/pis/leaveType/createLeaveType/${id}`);
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
              <TableCell>{row.attOfficeName}</TableCell>
              <TableCell> {row.name}</TableCell>
              <TableCell>{String(row.sewaName)}</TableCell>
              <TableCell>{String(row.status)}</TableCell>
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
      <ListHeader title="बिदा प्रकार सूची" />
      <ListButton url={`/pis/leaveType/createLeaveType`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: 1, name: "सि.नं." },
  { id: 2, name: "कार्यालयको नाम" },
  { id: 3, name: "बिदा प्रकार" },
  { id: 4, name: "सेवा" },
  { id: 5, name: "स्थिति" },
  { id: 6, name: "कार्य" },
];
