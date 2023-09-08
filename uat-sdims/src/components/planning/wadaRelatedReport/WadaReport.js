import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { fiscal } from "../../../services/apiServices/common/fiscal/fiscalService";
import { getWadaRelatedReport } from "../../../services/apiServices/planning/report/reportService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ward } from "../../../services/apiServices/common/ward/wardService";
import { set } from "react-hook-form";

const WadaReport = () => {
  const aa = new BikramSambat(new Date()).toBS();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // for yojanaNameId
  const [wardNoApi, setWardNoApi] = useState([]);
  const [wardId, setWardId] = useState("");

  const handleWadaNo = (e) => {
    setWardId(e.target.value);
  };
  useEffect(() => {
    let wardApiData = () => {
      ward().then((response) => {
        try {
          response.status === true;

          {
            setWardNoApi(response.data);
            setLoading(false);
          }
        } catch (error) {}
      });
    };

    wardApiData();
  }, []);

  // for fiscalYearId
  const [fiscalId, setFiscalId] = useState([]);
  const [fiscalYearId, setFiscalValue] = useState("");

  const handleFiscalYear = (e) => {
    setFiscalValue(e.target.value);
  };

  useEffect(() => {
    let fiscalApiData = () => {
      fiscal().then((response) => {
        try {
          response.status === true;

          {
            setFiscalId(response.data);
            setLoading(false);
          }
        } catch (error) {}
      });
    };

    fiscalApiData();
  }, []);

  //   for genrate receipt according to id

  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    let receiptApiData = () => {
      getWadaRelatedReport(fiscalYearId, wardId).then((response) => {
        try {
          response.status === true;
          {
            setApiData(response.data);
            setLoading(false);
          }
        } catch (error) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
        }
      });
    };
    receiptApiData();
  }, [fiscalYearId, wardId]);

  return (
    <>
      <form className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
        <div className="font-bold text-lg text-red-600">
          वडास्तरीय योजना तथा कार्यक्रम रिपोर्ट सिर्जना गर्न योजनाको नाम र वडा
          नं छान्नुहोस् ||
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label className="label text-blue-900 ">वडा नं</label>
          <select
            onChange={handleWadaNo}
            value={wardId}
            className="peer"
            required
          >
            <option value={""} selected disabled>
              ---- वडा नं छान्नुहोस् ----
            </option>

            {wardNoApi.map((items, index) => {
              return (
                <option key={index} value={items?.id}>
                  {items.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <label className="label text-blue-900 ">आर्थिक वर्ष</label>
          <select
            onChange={handleFiscalYear}
            value={fiscalYearId}
            className="peer"
            required
          >
            <option value={""} selected disabled>
              ---- आर्थिक वर्ष छान्नुहोस् ----
            </option>

            {fiscalId.map((items, index) => {
              return (
                <option key={index} value={items?.id}>
                  {items.name}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="flex-col pt-4 bg-[#F0F1F5] px-3 ">
        <div
          className="flex flex-col xl:flex-row my-10 gap-8"
          ref={componentRef}
        >
          <div className="bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] rounded-xl p-5 w-full ">
            <div className="flex justify-between pb-10  ">
              <div>
                <Image
                  src="https://res.cloudinary.com/dg1opyudu/image/upload/v1678796501/SDIMS/Emblem_of_Nepal_c3mw8w.png"
                  height={120}
                  width={120}
                  alt="nagarpalika logo"
                  priority
                />
              </div>
              <div className="text-2xl font-extrabold text-center pt-10 ">
                वडास्तरीय योजना तथा कार्यक्रम रिपोर्ट
              </div>
              <div className="text-xl font-bold pt-10 ">मिति : {aa}</div>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow className="bg-[#3e8dc1fd]">
                    <TableCell sx={{ fontSize: "20px" }}>सि.नं</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      आर्थिक वर्ष{" "}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>वडा नं</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      आयोजनाको नाम{" "}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {" "}
                      लागत अनुमान{" "}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apiData?.map((items, index) => {
                    return (
                      <TableRow className="hover:bg-[#a0cae7fd]  " key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell component="th" scope="row">
                          {items.fiscalYearName}
                        </TableCell>
                        <TableCell>{items.wardId}</TableCell>
                        <TableCell>{items.project_Name}</TableCell>
                        <TableCell>{items.project_estimated_Amount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <br />
        </div>

        <div className="flex justify-end">
          <button
            className="flex justify-end items-center bg-white rounded-xl p-3 gap-2"
            onClick={handlePrint}
          >
            <AiOutlineDownload size={20} />
            Download
          </button>
        </div>
        <br />
      </div>
    </>
  );
};

export default WadaReport;
