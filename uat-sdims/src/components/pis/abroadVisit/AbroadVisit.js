import React, { useCallback, useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { abroadVisit } from "../../../services/apiServices/pis/abroadVisit/abroadVisitService";
import ListVIewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import LoadingSpinner from "../../reusableDesign/Loading";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListButton from "../../reusableDesign/ListButton";
import { englishToNepali } from "../../../utils/utility";

export default function AbroadVisit() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching data from api
  useEffect(() => {
    const fetchedData = () => {
      abroadVisit().then(({ status, data, message }) => {
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
      router.push(`/pis/abroadVisit/createAbroadVisit/${id}`);
    },
    [router]
  );

  const newLocal = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell component="th" scope="row">
                {englishToNepali(index + 1)}
              </TableCell>
              <TableCell> {row.aimtoVisit} </TableCell>
              <TableCell>{row.duration}</TableCell>
              <TableCell>{row.visitSubject}</TableCell>
              <TableCell>{(row.startDateNep)}</TableCell>
              <TableCell>{(row.endDateNep)}</TableCell>
          

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
      <ListHeader title={"भ्रमण विवरण सूची"} />
      <ListButton url={"/pis/abroadVisit/createAbroadVisit"} />
      {loading ? <LoadingSpinner /> : newLocal}
    </ListVIewPageDesign>
  );
}

const tableHeadData = [
  { id: 1, name: "सि.नं" },
  { id: 2, name: " भ्रमण गर्ने लक्ष्य " },
  { id: 3, name: "अवधि" },
  { id: 4, name: " बिषय" },
  { id: 5, name: "मिति देखि" },
  { id: 6, name: "  मिति सम्म" },
  { id: 7, name: "कार्य" },
];
