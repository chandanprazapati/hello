import React, { useEffect,  useCallback } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "../../reusableDesign/Loading";
import { appointment } from "../../../services/apiServices/common/appointment/appointmentService";
import ListHeader from "../../reusableDesign/ListHeader";
import ListVIewPageDesign from "../../reusableDesign/ListViewPageDesign";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListButton from "../../reusableDesign/ListButton";

export default function Disabled() {
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
      router.push(`/identityProof/disabled/createDisabled/${id}`);
    },
    [router]
  );

  const newLocal = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => (
          <TableRow key={index} className="hover:bg-[#a0cae7fd]">
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.name}</TableCell>
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
    <ListVIewPageDesign>
      <ListHeader title="अपाङ्गता सूची" />
      <ListButton url={`/identityProof/disabled/createDisabled`} />
      {loading ? <LoadingSpinner /> : newLocal}
    </ListVIewPageDesign>
  );
}

const tableHeadData = [
  { id: 1, name: "पुरानाम,थर(अंग्रेजीमा)" },
  { id: 2, name: "पुरानाम,थर(नेपालीमा)" },
  { id: 3, name: "ट्र्याकिङ न." },
  { id: 4, name: "प्रमाणित गर्नुहोस्" },
  { id: 5, name: " कार्य " },
];
