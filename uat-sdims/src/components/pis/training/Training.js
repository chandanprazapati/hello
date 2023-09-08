import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { trainingRecord } from "../../../services/apiServices/pis/training/trainingService";
import { englishToNepali } from "../../../utils/utility";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";
import LoadingSpinner from "../../reusableDesign/Loading";

export default function Training() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let trainingRecordApiData = () => {
      trainingRecord().then((response) => {
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
    trainingRecordApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/pis/trainingRecord/createTraningRecord/${id}`);
  };

  const loacale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell component="th" scope="row">
                {englishToNepali(index + 1)}
              </TableCell>
              <TableCell>{row.chooseTrainingType}</TableCell>

              <TableCell>{englishToNepali(row.startDateNep)}</TableCell>
              <TableCell>{englishToNepali(row.endDateNep)}</TableCell>
              <TableCell>{row.trainingOfficeName}</TableCell>
              <TableCell>{row.trainingDetailAndsubject}</TableCell>

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
      <ListHeader title="प्रशिक्षण विवरण सूची" />
      <ListButton url={`/pis/trainingRecord/createTraningRecord`} />
      {loading ? <LoadingSpinner /> : loacale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "chooseTrainingType", name: "प्रशिक्षण प्रकार नाम" },
  { id: "startDateNep", name: "नियुक्ति मिति" },
  { id: "endDateNep", name: "अन्तिम मिति" },
  { id: "trainingOfficeName", name: "प्रशिक्षण अफिस नाम" },
  { id: "trainingDetailAndsubject", name: "प्रशिक्षण विवरण र विषय" },
  { id: "action", name: "कार्य" },
];
