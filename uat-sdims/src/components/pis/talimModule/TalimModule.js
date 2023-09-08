import React, { useCallback, useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { talimModule } from "../../../services/apiServices/pis/talimModule/talimModuleService";
import ListVIewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import LoadingSpinner from "../../reusableDesign/Loading";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListButton from "../../reusableDesign/ListButton";

export default function TalimModule() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching data from api
  useEffect(() => {
    const fetchedData = () => {
      talimModule().then(({ status, data, message }) => {
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
      router.push(`/pis/talimModule/createTalimModule/${id}`);
    },
    [router]
  );

  // data displayed and stored in variable
  const newLocal = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.startMiti}</TableCell>
              <TableCell>{row.endMiti}</TableCell>

              <TableCell>{row.status}</TableCell>

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
      <ListHeader title={"तालिम मोड्युल विवरण सूची"} />
      <ListButton url={`/pis/talimModule/createTalimModule`} />
      {loading ? <LoadingSpinner /> : newLocal}
    </ListVIewPageDesign>
  );
}

const tableHeadData = [
  { title: "सि.नं", id: 1 },
  { title: "नाम", id: 2 },
  { title: "देखि मिति(नेपाली)", id: 3 },
  { title: "सम्म मिति(नेपाली)", id: 4 },
  { title: "स्थिति", id: 5 },
  { title: "कार्य ", id: 6 },
  { title: "कैफियत", id: 7 },
  { title: "कार्य", id: 8 },
];
