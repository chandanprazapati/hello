import React, { useEffect, useCallback } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "../../reusableDesign/Loading";
import ListHeader from "../../reusableDesign/ListHeader";
import ListTopButton from "../../reusableDesign/ListButton";
import ListVIewPageDesign from "../../reusableDesign/ListViewPageDesign";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { complaintTypeService } from "../../../services/apiServices/complaint/complaintType/complaintTypeService";
import { englishToNepali } from "../../../utils/utility";
export default function ComplaintType() {
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
          else{
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
      router.push(`/complaint/complaintType/createComplaintType/${id}`);
    },
    [router]
  );

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => (
          <TableRow key={index} className="hover:bg-[#a0cae7fd]">
            <TableCell>{englishToNepali(index + 1)}</TableCell>
            <TableCell>{row.complaintTypeName}</TableCell>
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
  );

  return (
    <ListVIewPageDesign>
      <ListHeader title=" गुनासो प्रकार " />
      <ListTopButton url={`/complaint/complaintType/createComplaintType`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListVIewPageDesign>
  );
}

const tableHeadData = [
  { id: 0, name: "क्र.सं" },
  { id: 1, name: "नाम" },
  { id: 3, name: "कार्य" },
];
