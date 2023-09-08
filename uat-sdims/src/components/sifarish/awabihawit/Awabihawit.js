import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaEdit, FaEye, FaTrashAlt, FaUpload } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { englishToNepali } from "../../../utils/utility";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../reusableDesign/ListHeader";
import ListButton from "../../reusableDesign/ListButton";
import LoadingSpinner from "../../reusableDesign/Loading";
import Paper from "@mui/material/Paper";
import { awabihawit } from "../../../services/apiServices/sifarish/awabiwahit/awabiwahitService";
import SifarishModal from "../../reusableDesign/SifarishModal";
import { toast } from "react-toastify";
export default function Awabihawit() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = () => {
      awabihawit().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {}
      });
    };
    fetchedData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/sifarish/awabihawit/createAwabihawit/${id}`);
  };

  const handleDetail = (id) => {
    router.push(`/sifarish/awabihawit/details/${id}`);
  };

  const handleUploadDocs = (id) => {
    router.push(`/sifarish/awabihawit/uploadDocs/${id}`);
  };

  const [show, setShow] = useState(false);

  const handleCancel = () => {
    toast.error("Process Terminated", {
      autoClose: 1000,
    });
    setShow(false);
  };

  const handle = () => {
    // deleteBhuktaniType(deleteId).then((response) => {
    //   try {
    //     response.status === true;
    //     {
    //       toast.success("Deleted Sucessfully", {
    //         autoClose: 1000,
    //       });
    //       bhuktaniType().then((response) => {
    //         try {
    //           response.status === true;
    //           {
    //             setApiData(response.data);
    //             setLoading(false);
    //           }
    //         } catch (error) {
    //           toast.error(response.message, {
    //             autoClose: 1000,
    //           });
    //         }
    //       });
    //     }
    //   } catch (error) {
    //     toast.error(response.message, {
    //       autoClose: 1000,
    //     });
    //   }
    //   setShow(false);
    // });
  };

  const [verifyId, setVerifyId] = useState("");
  console.log(verifyId, "verifyId");
  const [unVerifyId, setUnVerifyId] = useState("");
  console.log(unVerifyId, "unVerifyId");
  const handleVerify = (id) => {
    setShow(!show);
    setVerifyId(id);
  };

  const handleUnVerify = (id) => {
    setShow(!show);
    setUnVerifyId(id);
  };

  const locale = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow className="bg-[#3e8dc1fd]">
            <TableCell sx={{ fontSize: "16px" }}>सि.नं</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>नागरिकता नं.</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>पूरा नाम थर</TableCell>
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
              <TableCell>{row.nagriktaNo}</TableCell>
              <TableCell>{row.fullName_Nepali}</TableCell>
              <TableCell>{englishToNepali(row.trackingNo)}</TableCell>
              <TableCell>{row.verify}</TableCell>

              <TableCell className="pl-7 cursor-pointer  ">
                <div className=" flex flex-wrap gap-1 ">
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <ListViewPageDesign>
      <ListHeader title="अविवाहित सूची" />
      <ListButton url={`/sifarish/awabihawit/createAwabihawit`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}
