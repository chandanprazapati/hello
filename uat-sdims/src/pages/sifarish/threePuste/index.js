import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import { useRouter } from "next/router";
import MuiTable from "../../../components/reusableDesign/muiTableDesign/MuiTable";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { englishToNepali } from "../../../utils/utility";
import { FaEdit } from "react-icons/fa";
import ListViewPageDesign from "../../../components/reusableDesign/ListViewPageDesign";
import ListHeader from "../../../components/reusableDesign/ListHeader";
import ListButton from "../../../components/reusableDesign/ListButton";
import LoadingSpinner from "../../../components/reusableDesign/Loading";
import { aadibasiJanjati } from "../../../services/apiServices/sifarish/aadiwasiJanajaati/aadiwasiJanjatiService";

export default function Index() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      aadibasiJanjati().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
            setLoading(false);
          } else status === false;
          {
            setLoading(false);
            toast.error(message, {
              autoClose: 1000,
            });
          }
        } catch (error) {
          console.log(error);
        }
      });
    };
    fetchedData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/sifarish/threePuste/createThreePuste/${id}`);
  };

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => (
          <TableRow key={index} className="hover:bg-[#a0cae7fd]">
            <TableCell>{englishToNepali(index + 1)}</TableCell>
            <TableCell>{row.nagritaNo}</TableCell>
            <TableCell>{row.fullName}</TableCell>
            <TableCell>{row.total}</TableCell>

            <TableCell>{row.trackingNo}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell
              className="pl-7 cursor-pointer hover:text-blue-900"
              onClick={() => {
                handleEdit(row.id);
              }}
            >
              <FaEdit size={20} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );
  return (
    <React.Fragment>
      <SeoOptimization title={"Three Puste"} />
      <ListViewPageDesign>
        <ListHeader title="तीन पुस्ते सिफारिस सूची" />
        <ListButton url={`/sifarish/threePuste/createThreePuste`} />
        {loading ? <LoadingSpinner /> : locale}
      </ListViewPageDesign>
    </React.Fragment>
  );
}

const tableHeadData = [
  { id: "id", name: "सि.नं." },
  { id: "nagritaNo", name: "नाम थर	" },
  { id: "fullName", name: "नाम थर(English)" },
  { id: "total", name: "ना.प्र.प.नं.	" },
  { id: "total", name: "दर्ता मिति	" },
  { id: "trackingNo", name: "ट्र्याकिङ नं." },
  { id: "status", name: "स्थिति" },
  { id: "action", name: "कार्य" },
];
