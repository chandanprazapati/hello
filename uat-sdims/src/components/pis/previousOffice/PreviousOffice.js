import React, { useCallback, useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { previousOffice } from "../../../services/apiServices/pis/previousOfficeRecord/prerviosOfficeRecordService";
import ListHeader from "../../reusableDesign/ListHeader";
import LoadingSpinner from "../../reusableDesign/Loading";
import ListVIewPageDesign from "../../reusableDesign/ListViewPageDesign";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListButton from "../../reusableDesign/ListButton";
import { englishToNepali } from "../../../utils/utility";

export default function PreviousOffice() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching data from api
  useEffect(() => {
    const fetchedData = () => {
      previousOffice().then(({ status, data, message }) => {
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

  // for edit button
  const handleEdit = useCallback(
    (id) => {
      router.push(`/pis/previousOfficeRecord/createPreviousOfficeRecord/${id}`);
    },
    [router]
  );

  // data displayed and strored in variable
  const newLocal = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell component="th" scope="row">
                {englishToNepali(index + 1)}
              </TableCell>
              <TableCell>{row.employeeName}</TableCell>
              <TableCell>{row.previousOfficeName}</TableCell>
              <TableCell>{row.postName}</TableCell>
              <TableCell>{englishToNepali(row.startDateNep)}</TableCell>
              <TableCell>{englishToNepali(row.endDateNep)}</TableCell>
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
    <ListVIewPageDesign>
      <ListHeader title="पुरानो कार्यालय सुची  " />
      <ListButton
        url={`/pis/previousOfficeRecord/createPreviousOfficeRecord`}
      />
      {loading ? <LoadingSpinner /> : newLocal}
    </ListVIewPageDesign>
  );
}
const tableHeadData = [
  { id: 1, name: "क्र.सं." },
  { id: 2, name: "कर्मचारीको नाम" },
  { id: 3, name: "अघिल्लो कार्यालयको नाम" },
  { id: 4, name: "पद" },
  { id: 5, name: "सुरु मिति " },
  { id: 6, name: "अन्तिम मिति " },
  { id: 8, name: "कार्य" },
];
