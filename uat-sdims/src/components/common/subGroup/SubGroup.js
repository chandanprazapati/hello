import React, { useEffect, useState, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "../../reusableDesign/Loading";
import { subGroup } from "../../../services/apiServices/common/subGroup/subGroupService";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";

export default function SubGroup() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      subGroup().then(({ status, data, message }) => {
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
      router.push(`/common/subGroup/createSubGroup/${id}`);
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
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.groupId}</TableCell>
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
      <ListHeader title="उप-समूह सूची" />
      <ListButton url="/common/subGroup/createSubGroup" />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "सि.नं." },
  { id: "name", name: "नाम" },
  { id: "groupId", name: "समूह" },
  { id: "Action", name: "कार्य" },
];



