import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { englishToNepali } from "../../../utils/utility";
import LoadingSpinner from "../../../components/reusableDesign/Loading";
import ListHeader from "../../../components/reusableDesign/ListHeader";
import MuiTable from "../../../components/reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../../components/reusableDesign/ListViewPageDesign";
import ListButton from "../../../components/reusableDesign/ListButton";
import { legalDarta } from "../../../services/apiServices/legalCase/legalCaseService";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

export default function Darta() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      legalDarta().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
            setLoading(false);
          } else status === false;
          {
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
  }, []);

  const handleEdit = useCallback(
    (id) => {
      router.push(`/legalCase/darta/createDarta/${id}`);
    },
    [router]
  );

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      
      <SeoOptimization title={"LC Darta"} />
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>{row.fiscalName}</TableCell>
              <TableCell> {englishToNepali(row.dartaNo)}</TableCell>
              <TableCell>{(row.dartaDate)}</TableCell>
              <TableCell>{row.patrakoMiti}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.office}</TableCell>
              <TableCell>{row.reciverName}</TableCell>
              <TableCell>{row.reciverdate}</TableCell>


        
              <TableCell
                className="pl-7 cursor-pointer hover:text-blue-900  "
                onClick={() => {
                  handleEdit(row.id);
                }}
              >
                <div>
                  <FaEdit size={20} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );

  return (
    <ListViewPageDesign>
      <ListHeader title="दर्ता सूची" />
      <ListButton url={`/legalCase/darta/createDarta`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "fiscalYear", name: "आर्थिक बर्ष" },
  { id: "darta No", name: "दर्ता नं" },
  { id: "darta Date", name: "दर्ता मिति" },
  { id: "patraKo Date", name: "पत्रको मिति" },
  { id: "subject", name: "विषय" },
  { id: "pathaune office ko name", name: "पठाउने कार्यालयको नाम" },
  { id: "bujhiline ko name", name: "बुझिलिने  नाम" },
  { id: "bujhiline ko date", name: "बुझिलिने  मिति" },
  { id: "action", name: "कार्य" },
];
