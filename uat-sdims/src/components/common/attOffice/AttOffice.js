import React, { useCallback, useEffect, useState } from "react";
import {
  List,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "../../reusableDesign/Loading";
import { attOffice } from "../../../services/apiServices/common/attOffice/attOfficeService";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import { englishToNepali } from "../../../utils/utility";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";

export default function AttOffice() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      attOffice().then(({ status, data, message }) => {
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
      router.push(`/common/attOffice/createAttOffice/${id}`);
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
              <TableCell>{row.attOfficeId}</TableCell>
              <TableCell>{row.officeTypeName}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{englishToNepali(row.phoneNo)}</TableCell>
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
      <ListHeader title="कार्यालयको हाजिरी सूची" />
      <ListButton url={`/common/attOffice/createAttOffice`} />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "सि.नं." },
  { id: "attOfficeId", name: "कार्यालयको हाजिरी आईडी" },
  { id: "officeTypeName", name: "कार्यालयको हाजिरी प्रकार" },
  { id: "name", name: "नाम" },
  { id: "address", name: "ठेगाना" },
  { id: "phoneNo", name: "फोन न." },
  { id: "action", name: "कार्य" },
];
