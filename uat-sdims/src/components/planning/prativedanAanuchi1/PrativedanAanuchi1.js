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
import {
  getPragatiPratibedanAnusuchi1Report,
  getSamjhautaReport,
} from "../../../services/apiServices/planning/report/reportService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PrativedanAanuchi1 = () => {
  const aa = new BikramSambat(new Date()).toBS();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // for yojanaNameId
  // const [yojanaNameId, setYojanaNameId] = useState([]);
  // const [projectName, setYojanaNameValue] = useState("");

  // const handleYojanaName = (e) => {
  //   setYojanaNameValue(e.target.value);
  // };
  // useEffect(() => {
  //   let yojanaNameApiData = () => {
  //     yojana().then((response) => {
  //       try {
  //         response.status === true;

  //         {
  //           setYojanaNameId(response.data);
  //         }
  //       } catch (error) {}
  //     });
  //   };

  //   yojanaNameApiData();
  // }, []);

  // for fiscalYearId
  // const [fiscalId, setFiscalId] = useState([]);
  // const [fiscalYearid, setFiscalValue] = useState("");

  // const handleFiscalYear = (e) => {
  //   setFiscalValue(e.target.value);
  // };

  // useEffect(() => {
  //   let fiscalApiData = () => {
  //     fiscal().then((response) => {
  //       try {
  //         response.status === true;

  //         {
  //           setFiscalId(response.data);
  //         }
  //       } catch (error) {}
  //     });
  //   };

  //   fiscalApiData();
  // }, []);

  //   for genrate receipt according to id

  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    let receiptApiData = () => {
      getPragatiPratibedanAnusuchi1Report().then((response) => {
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
  }, [setApiData]);

  return (
    <>
      {/* <form className="grid lg:grid-cols-3  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
        <div className="font-bold text-lg text-red-600">
        प्रगति प्रतिवेदन अनुसूची १को रिपोर्ट सिर्जना गर्न योजनाको नाम र आर्थिक वर्ष छान्नुहोस् ||
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
      </form> */}
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
              <div>
                <div className="text-2xl font-extrabold text-center">
                  प्रगति प्रतिवेदन
                </div>
                <div className="text-xl font-bold text-center ">अनुसूचि १</div>
                <div className="text-center font-bold ">
                  प्रथम | चौमासिक | बार्षिक
                </div>
                <div className="text-center font-bold">
                  वडास्तरीय / नगरस्तरीय योजनाको भौतिक प्रगति विवरण
                </div>
              </div>
              <div className="text-xl font-bold pt-20">मिति : {aa}</div>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow className="bg-[#3e8dc1fd]">
                    <TableCell sx={{ fontSize: "20px" }}>सि.नं</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      आर्थिक वर्ष{" "}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      स्वीकृत रकम{" "}
                    </TableCell>

                    <TableCell sx={{ fontSize: "20px" }}>
                      {" "}
                      सम्झौता गर्ने संस्थाको नाम{" "}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {" "}
                      सम्झौता मिति{" "}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {" "}
                      सम्पन्न मिति{" "}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {" "}
                      उपभोक्ता समितिको नाम{" "}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apiData?.planningSamjhautaList?.map((item, index) => {
                    return (
                      <TableRow key={index} className="hover:bg-[#a0cae7fd]  ">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item?.fiscalYearName}</TableCell>
                        <TableCell>{item?.project_estimated_Amount}</TableCell>
                        <TableCell>{item?.samjhauta_Org_Name}</TableCell>
                        <TableCell>{item?.project_Start_Date}</TableCell>
                        <TableCell>{item?.project_End_Date}</TableCell>
                        <TableCell>{item?.upaBhoktaSamitiName}</TableCell>
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

export default PrativedanAanuchi1;
