import React, { useEffect, useState, useCallback } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { rajPatrankitSheni } from "../../../services/apiServices/common/rajPatrankitSheni/rajPatrankitSheniService";
import { englishToNepali } from "../../../utils/utility";
import LoadingSpinner from "../../reusableDesign/Loading";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";

export default function RajPatrankitSheni() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      rajPatrankitSheni().then(({ status, data, message }) => {
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
      router.push(`/common/rajpatrankitsheni/createRajpatrankitsheni/${id}`);
    },
    [router]
  );

  const loacale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>{row.name}</TableCell>
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
      <ListHeader title="राज पत्रांकित श्रेणी सूची" />
      <ListButton url={"/common/rajpatrankitsheni/createRajpatrankitsheni"} />
      {loading ? <LoadingSpinner /> : loacale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "name", name: "नाम" },
  { id: "action", name: "कार्य" },
];
