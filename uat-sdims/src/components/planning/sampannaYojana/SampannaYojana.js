import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { yojana } from "../../../services/apiServices/planning/yojana/yojanaService";
import { fiscal } from "../../../services/apiServices/common/fiscal/fiscalService";
import { getSamjhautaCompletedReport } from "../../../services/apiServices/planning/report/reportService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { budgetSource } from "../../../services/apiServices/planning/budgetSource/budgetSourceService";
import { FaEdit, FaPrint, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/router";

const SampannaYojana = () => {
  const aa = new BikramSambat(new Date()).toBS();
  const router = useRouter();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // for yojanaNameId
  const [yojanaNameId, setYojanaNameId] = useState([]);
  const [projectName, setYojanaNameValue] = useState("");

  const handleYojanaName = (e) => {
    setYojanaNameValue(e.target.value);
  };
  useEffect(() => {
    let yojanaNameApiData = () => {
      yojana().then((response) => {
        try {
          response.status === true;

          {
            setYojanaNameId(response.data);
          }
        } catch (error) {}
      });
    };

    yojanaNameApiData();
  }, []);

  //   for budget source
  const [budgetSourceApi, setBudgetSourceApi] = useState([]);
  const [budgetSourceId, setBudgetSourceId] = useState("");

  const handleBudgetSource = (e) => {
    setBudgetSourceId(e.target.value);
  };

  useEffect(() => {
    let budgetSourceApiData = () => {
      budgetSource().then((response) => {
        try {
          response.status === true;
          {
            setBudgetSourceApi(response.data);
          }
        } catch (error) {}
      });
    };
    budgetSourceApiData();
  }, []);

  // for fiscalYearId
  const [fiscalId, setFiscalId] = useState([]);
  const [fiscalYearid, setFiscalValue] = useState("");

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
      getSamjhautaCompletedReport(
        fiscalYearid,
        projectName,
        budgetSourceId
      ).then((response) => {
        try {
          response.status === true;
          {
            setApiData(response.data);
            setLoading(false);
          }
        } catch (error) {
          toast.success("Fetched Data", {
            icon: "🚀",
            autoClose: 1000,
          });
        }
      });
    };
    receiptApiData();
  });

  const handleKaryaSampanna = (id) => {
    router.push(`/planning/samjhauta/sampannayojana/karyasampanna/${id}`);
  };

  const handleChitti = (id) => {
    router.push(`/planning/samjhauta/sampannayojana/hastantranPatra/${id}`);
  };

  return (
    <>
      <form className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
        <div className="font-bold text-lg text-red-600">
          सम्पन्न आयोजनाको रिपोर्ट सिर्जना गर्न योजनाको नाम र आर्थिक वर्ष
          छान्नुहोस् ||
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label className="label text-blue-900 ">योजनाको नाम</label>
          <select
            onChange={handleYojanaName}
            value={projectName}
            className="peer"
            required
          >
            <option value={""} selected disabled>
              ---- योजनाको नाम छान्नुहोस् ----
            </option>

            {yojanaNameId.map((items, index) => {
              return (
                <option key={index} value={items?.yojanaName}>
                  {items.yojanaName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <label className="label text-blue-900 ">आर्थिक वर्ष</label>
          <select
            onChange={handleFiscalYear}
            value={fiscalYearid}
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

        <div className="relative z-0 w-full mb-6 group">
          <label className="label text-blue-900 ">वजेट श्रोत</label>
          <select
            onChange={handleBudgetSource}
            value={budgetSourceId}
            className="peer"
            required
          >
            <option value={""} selected disabled>
              ---- वजेट श्रोत छान्नुहोस् ----
            </option>

            {budgetSourceApi.map((items, index) => {
              return (
                <option key={index} value={items?.budgetSourceId}>
                  {items.budgetSourceName}
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
              <div className="text-2xl font-extrabold text-center pt-6 ">
                सम्पन्न आयोजनाको रिपोर्ट
              </div>
              <div className="text-xl font-bold pt-10 ">मिति : {aa}</div>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow className="bg-[#3e8dc1fd]">
                    <TableCell>सि.नं</TableCell>
                    <TableCell>आर्थिक वर्ष </TableCell>
                    <TableCell>वजेट श्रोत </TableCell>
                    <TableCell>वडा/नगर </TableCell>
                    <TableCell>आयोजनाको नाम </TableCell>
                    <TableCell>आयोजनाको स्थल </TableCell>
                    <TableCell>सम्झौता गर्ने संस्थाको नाम </TableCell>
                    <TableCell>सम्पन्न भएको मिति </TableCell>
                    <TableCell>कुल रकम </TableCell>
                    <TableCell>कार्यहरु </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="hover:bg-[#a0cae7fd]">
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>

                    <TableCell className="cursor-pointer ">
                      <div className=" space-y-4 ">
                        <div
                          className=" flex border border-black px-1 py-2 gap-1  cursor-pointer hover:text-blue-900 bg-gray-500"
                          onClick={() => {
                            handleKaryaSampanna(apiData.aayojanaMaintainanceId);
                          }}
                        >
                          <FaPrint size={20} />
                          <text className="font-bold text-white ">
                            कार्य सम्पन्न
                          </text>
                        </div>
                        <div
                          className=" flex border border-black px-1 py-2 gap-1  cursor-pointer hover:text-blue-900 bg-gray-500"
                          onClick={() => {
                            handleChitti(apiData.aayojanaMaintainanceId);
                          }}
                        >
                          <FaPrint size={20} />
                          <text className="font-bold text-white  text-[10px] ">
                            हस्तान्तरण चिठी
                          </text>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
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

export default SampannaYojana;
