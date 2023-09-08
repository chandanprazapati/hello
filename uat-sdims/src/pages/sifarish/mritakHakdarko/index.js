import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import { useRouter } from "next/router";
import { appointment } from "../../../services/apiServices/common/appointment/appointmentService";
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
    router.push(`/sifarish//mritakHakdarko/createMritakHakdarko/${id}`);
  };

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => (
          <TableRow key={index} className="hover:bg-[#a0cae7fd]">
            <TableCell>{englishToNepali(index + 1)}</TableCell>
            <TableCell>{row.fullName}</TableCell>
            <TableCell>{row.nagiritaNo}</TableCell>
            <TableCell>{row.phoneNo}</TableCell>
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
      <SeoOptimization title={"Mritak Hakdarko"} />
      <ListViewPageDesign>
        <ListHeader title="मृतक हकदारको सिफारिस सूची" />
        <ListButton url={`/sifarish/mritakHakdarko/createMritakHakdarko`} />
        {loading ? <LoadingSpinner /> : locale}
      </ListViewPageDesign>
    </React.Fragment>
  );
}

const tableHeadData = [
  { id: "id", name: "सि.नं." },
  { id: "dartaMiti", name: "दर्ता मिति" },
  { id: "fullName", name: " नाम थर" },
  { id: "mritakName", name: "मृतकको नाम" },
  { id: "trackingNo", name: "ट्र्याकिङ नं." },
  { id: "status", name: "स्थिति" },
  { id: "action", name: "कार्य" },
];
