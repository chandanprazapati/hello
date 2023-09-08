import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { publicHoliday } from "../../../services/apiServices/pis/publicHoliday/publicHolidayService";
import LoadingSpinner from "../../reusableDesign/Loading";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListTopButton from "../../reusableDesign/ListButton";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import { englishToNepali } from "../../../utils/utility";
export default function PublicHoliday() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      publicHoliday().then(({ status, data, message }) => {
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
      router.push(`/pis/publicHoliday/createPublicHoliday/${id}`);
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
              <TableCell>{row.attOfficeName}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{englishToNepali(row.startDateNep)}</TableCell>
              <TableCell>{englishToNepali(row.endDateNep)}</TableCell>
              <TableCell>{String(row.status)}</TableCell>
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
      <ListHeader title="सार्वजनिक विदा सूची" />
      <ListTopButton url={`/pis/publicHoliday/createPublicHoliday`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "attOfficeName", name: "कार्यालयको हाजिरी नाम " },
  { id: "name", name: "नाम" },
  { id: "startDateNep", name: " सुरू मिति" },
  { id: "endDateNep", name: " अन्तिम मिति" },
  { id: "status", name: "स्थिति" },
  { id: "action", name: "कार्य" },
];
