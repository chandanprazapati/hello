import React, { useEffect, useCallback } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "../../reusableDesign/Loading";
import ListHeader from "../../reusableDesign/ListHeader";
import ListVIewPageDesign from "../../reusableDesign/ListViewPageDesign";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { complaintTypeService } from "../../../services/apiServices/complaint/complaintType/complaintTypeService";
import ListButton from "../../reusableDesign/ListButton";

export default function ComplaintDetails() {
  const router = useRouter();
  const [apiData, setApiData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchedData = () => {
      complaintTypeService().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
            setLoading(false);
          }
          else {
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
      router.push(`/complaint/complaintDetails/createComplaintDetails/${id}`);
    },
    [router]
  );

  return (
    <ListVIewPageDesign>
      <ListHeader title="गुनासो सूची" />
      <ListButton url={`/complaint/complaintDetails/createComplaintDetails`} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <MuiTable tableHead={tableHeadData}>
          <TableBody>
            {apiData.map((row, index) => (
              <TableRow key={index} className="hover:bg-[#a0cae7fd]">
                <TableCell> {index + 1} </TableCell>
                <TableCell>{row.problemCreaterName}</TableCell>
                <TableCell>{row.mobileNo}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.complaintSensitivityId}</TableCell>
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
      )}
    </ListVIewPageDesign>
  );
}

const tableHeadData = [
  { id: 0, name: "क्र.सं" },
  { id: 1, name: "समस्या सिर्जनाकर्ता नाम" },
  { id: 2, name: "मोबाइल नम्बर" },
  { id: 2, name: "इमेल" },
  { id: 2, name: "गुनासो संवेदनशीलता " },
  { id: 6, name: "कार्य" },
];
