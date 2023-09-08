import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { awardDetail } from "../../../services/apiServices/pis/awardDetail/awardDetailService";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";
import LoadingSpinner from "../../reusableDesign/Loading";

export default function AwardDetail() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let awardDetailRecordApiData = () => {
      awardDetail().then((response) => {
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
    awardDetailRecordApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/pis/awardDetail/createAwardDetail/${id}`);
  };

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>{row.awardProvidedBy}</TableCell>
              <TableCell>{row.employeeId}</TableCell>
              <TableCell>{row.postId}</TableCell>
              <TableCell>{row.awardTypeId}</TableCell>
              <TableCell>{englishToNepali(row.awardDateNep)}</TableCell>
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
      <ListHeader title="विभूषण/सम्मान विवरण  सूची" />
      <ListButton url={`/pis/awardDetail/createAwardDetail`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "employeeId", name: "विभूषण/सम्मान प्रदान गर्ने" },
  { id: "awardProvidedBy", name: "कर्मचारी" },
  { id: "postId", name: "पद" },
  { id: "awardTypeId", name: "विभूषण/सम्मान प्रकार" },
  { id: "awardDateNep", name: "विभूषण/सम्मान मिति" },
  { id: "action", name: "कार्य" },
];
