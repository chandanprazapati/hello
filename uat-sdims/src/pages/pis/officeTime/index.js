import { TableBody, TableCell, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
const BS = require("bikram-sambat-js");
import SeoOptimization from "@/components/reusableDesign/SeoOptimzation";
import { TimeSpanTimeOnly, englishToNepali } from "@/utils/utility";
import ListHeader from "../../../components/reusableDesign/ListHeader";
import MuiTable from "../../../components/reusableDesign/muiTableDesign/MuiTable";
import ListButton from "../../../components/reusableDesign/ListButton";
import LoadingSpinner from "@/components/reusableDesign/Loading";
import { officeTime } from "../../../services/apiServices/pis/officeTime/officeTimeService";
export default function Index() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      officeTime().then(({ status, data, message }) => {
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
      router.push(`/pis/officeTime/createOfficeTime/${id}`);
    },
    [router]
  );
  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((item, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}.</TableCell>
              <TableCell>{englishToNepali(item.startDate)}</TableCell>
              <TableCell>{englishToNepali(item.endDate)}</TableCell>
              <TableCell>
                {englishToNepali(TimeSpanTimeOnly(item.startTime))}
              </TableCell>
              <TableCell>
                {englishToNepali(TimeSpanTimeOnly(item.endTime))}
              </TableCell>
              <TableCell
                className="pl-7 cursor-pointer  hover:text-blue-900 "
                onClick={() => {
                  handleEdit(item.id);
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
    <>
      <SeoOptimization title="कार्यालयको समय" />
      <ListHeader title="कार्यालयको समय" />
      <ListButton url={`/pis/officeTime/createOfficeTime`} />
      {loading ? <LoadingSpinner /> : locale}
    </>
  );
}

const tableHeadData = [
  { id: 1, name: "क्रम संख्या" },
  { id: 2, name: "सूरु मिति" },
  { id: 3, name: "अन्त्य मिति" },
  { id: 4, name: "पुरादिन सुरु समय" },
  { id: 5, name: "पुरादिन अन्त्य समय" },
  { id: 6, name: "कार्य" },
];
