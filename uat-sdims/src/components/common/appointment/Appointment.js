import React, { useEffect, useCallback } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "../../reusableDesign/Loading";
import { appointment } from "../../../services/apiServices/common/appointment/appointmentService";
import ListHeader from "../../reusableDesign/ListHeader";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListButton from "../../reusableDesign/ListButton";
import { englishToNepali } from "../../../utils/utility";
export default function Appointment() {
  const router = useRouter();
  const [apiData, setApiData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchedData = () => {
      appointment().then(({ status, data, message }) => {
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
      router.push(`/common/appointment/createAppointment/${id}`);
    },
    [router]
  );

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => (
          <TableRow key={index} className="hover:bg-[#a0cae7fd]">
            <TableCell>{englishToNepali(index + 1)}</TableCell>
            <TableCell>{row.name}</TableCell>
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
    <ListViewPageDesign>
      <ListHeader title="नियुक्ति सूची" />
      <ListButton url={`/common/appointment/createAppointment`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "सि.नं." },
  { id: "name", name: "नाम" },
  { id: "Action", name: "कार्य" },
];
