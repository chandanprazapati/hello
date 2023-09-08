import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import { useRouter } from "next/router";
import MuiTable from "../../../components/reusableDesign/muiTableDesign/MuiTable";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { englishToNepali } from "../../../utils/utility";
import { FaEdit, FaEye, FaPrint, FaTrashAlt, FaUpload } from "react-icons/fa";
import ListViewPageDesign from "../../../components/reusableDesign/ListViewPageDesign";
import ListHeader from "../../../components/reusableDesign/ListHeader";
import ListButton from "../../../components/reusableDesign/ListButton";
import LoadingSpinner from "../../../components/reusableDesign/Loading";
import { getBasobas } from "../../../services/apiServices/sifarish/sthaiAsthaiBasobas/sthaiAsthaiBasobasService";
import { BsFillCheckCircleFill } from "react-icons/bs";
import SifarishModal from "../../../components/reusableDesign/SifarishModal";
import { toast } from "react-toastify";

export default function Index() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      getBasobas().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      });
    };
    fetchedData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(
      `/sifarish/sthaiAasthaiBasobas/createSthaiAasthaiBasobas/${id}`
    );
  };
  const handleDetail = (id) => {
    router.push(`/sifarish/sthaiAasthaiBasobas/details/${id}`);
  };
  const handleUploadDocs = (id) => {
    router.push(`/sifarish/sthaiAasthaiBasobas/uploadFile/${id}`);
  };
  const handlePrint = (id) => {
    router.push(`/sifarish/sthaiAasthaiBasobas/printBasobas/${id}`);
  };

  //for verification
  const [show, setShow] = useState(false);
  const handleCancel = () => {
    toast.error("process Terminated", {
      autoClose: 1000,
    });
    setShow(false);
  };
  const [verifyId, setVerifyId] = useState("");
  console.log(verifyId, "verifyID");
  const handleVerify = (id) => {
    setShow(!show);
    setVerifyId(id);
  };
  const [unVerifyId, setUnVerifyId] = useState("");
  console.log(unVerifyId, "unVerifyID");
  const handleUnVerify = (id) => {
    setShow(!show);
    setUnVerifyId(id);
  };

  const locale = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-aria-label="customized table">
        <TableHead>
          <TableRow className="bg-[#3e8dc1fd]">
            <TableCell sx={{ fontSize: "16px" }}>सि.नं.</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>बसोबास प्रकार</TableCell>
            <TableCell sx={{ fontSize: "15px" }}>बसोबास गरेको मिति</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>नाम थर</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>नाम थर(Eng)</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>ट्र्याकिङ नं.</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>स्थिति</TableCell>
            <TableCell
              sx={{
                fontSize: "16px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              कार्य
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData.map((row, index) => (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>{row.basobasTypeId}</TableCell>
              <TableCell>{row.basobasMiti}</TableCell>
              <TableCell>{row.naamThar}</TableCell>
              <TableCell>{row.ghardhaniNaamThar}</TableCell>
              <TableCell>{row.trackingNo}</TableCell>
              <TableCell>{row.verify}</TableCell>
              <TableCell className="cursor-pointer">
                <div className=" flex flex-wrap gap-1">
                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handleDetail(row.id);
                    }}
                  >
                    <div className="flex border-2 p-2 border-black bg-green-300 gap-2">
                      <text>विवरण</text>
                      <FaEye size={16} />
                    </div>
                  </div>
                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handleEdit(row.id);
                    }}
                  >
                    <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                      <text>सच्याउनुहोस</text>
                      <FaEdit size={16} />
                    </div>
                  </div>
                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handleUploadDocs(row.id);
                    }}
                  >
                    <div className="flex border-2 p-2 border-black bg-red-300 gap-2">
                      <text>कागजात</text>
                      <FaUpload size={16} />
                    </div>
                  </div>
                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handleVerify(row.id);
                    }}
                  >
                    <div className="flex border-2 p-2 border-black bg-yellow-300 gap-2">
                      <text>परमाणित गर्नुहोस्</text>
                      <BsFillCheckCircleFill size={16} />
                    </div>

                    <SifarishModal
                      visible={show}
                      onCancel={handleCancel}
                      onUnVerify={handleUnVerify}
                      onVerify={handleVerify}
                      leftButton={"verify"}
                      rightButton={"cancel"}
                      middleButton={"un Verify"}
                      heading={"Confirm to Verify !!!"}
                      title={
                        "Note If You once verify the data it cannot be reversed back be sure and conform to proceed the action"
                      }
                      icons={<FaTrashAlt size={20} />}
                    />
                  </div>
                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handlePrint(row.id);
                    }}
                  >
                    <div className="flex border-2 p-2 border-black bg-orange-500 gap-2">
                      <text>प्रिन्ट</text>
                      <FaPrint size={16} />
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <React.Fragment>
      <SeoOptimization title={"Sthai Aasthai Basobas "} />
      <ListViewPageDesign>
        <ListHeader title="स्थाई/अस्थाई बसोबास सिफारिस सूची" />
        <ListButton
          url={`/sifarish/sthaiAasthaiBasobas/createSthaiAasthaiBasobas/`}
        />
        {loading ? <LoadingSpinner /> : locale}
      </ListViewPageDesign>
    </React.Fragment>
  );
}

// const tableHeadData = [
//   { id: "id", name: "सि.नं." },
//   { id: "nagritaNo", name: "नाम थर	" },
//   { id: "fullName", name: "नाम थर(English)" },
//   { id: "total", name: "बसोबास प्रकार	" },
//   { id: "total", name: "बसोबास गरेको मिति" },
//   { id: "trackingNo", name: "ट्र्याकिङ नं." },
//   { id: "status", name: "स्थिति" },
//   { id: "action", name: "कार्य" },
// ];
