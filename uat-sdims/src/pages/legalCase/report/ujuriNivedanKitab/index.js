// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import { TableBody, TableCell, TableRow } from "@mui/material";
// import { FaDownload, FaEdit, FaFilePdf, FaPrint } from "react-icons/fa";

// import { useReactToPrint } from "react-to-print";
// import { AiOutlineDownload } from "react-icons/ai";
// import "nepali-datepicker-reactjs/dist/index.css";
// import BikramSambat from "bikram-sambat-js";
// import { englishToNepali } from "../../../../utils/utility";
// import { getUjuriNibedanReport } from "../../../../services/apiServices/legalCase/legalCaseService";
// import MuiTable from "../../../../components/reusableDesign/muiTableDesign/MuiTable";
// import ListViewPageDesign from "../../../../components/reusableDesign/ListViewPageDesign";
// import LoadingSpinner from "../../../../components/reusableDesign/Loading";
// import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

// export default function NivedanPatraDhacha() {
//   const aa = new BikramSambat(new Date()).toBS();
//   const inNepali = englishToNepali(aa);
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   const [apiData, setApiData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchedData = async () => {
//         getUjuriNibedanReport().then(({ status, data, message }) => {
//         try {
//           if (status) {
//             setApiData(data);
//             setLoading(false);
//           } else status === false;
//           {
//             setLoading(false);
//           }
//         } catch (error) {
//           toast.error(message, {
//             autoClose: 1000,
//           });
//         }
//       });
//     };
//     fetchedData();
//   }, []);

//   const locale = (
//     <MuiTable tableHead={tableHeadData}>
//       <TableBody>
//         {apiData.map((row, index) => {
//           return (
//             <TableRow key={index} className="hover:bg-[#a0cae7fd]">
//               <TableCell>{englishToNepali(index + 1)}</TableCell>
//               <TableCell>
//                 {" "}
//                 {`${row?.firstName} ${row?.middleName} ${row.lastName}`}
//               </TableCell>
//               <TableCell> {row.fatherName}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//               <TableCell> {row.mobileNo}</TableCell>
//             </TableRow>
//           );
//         })}
//       </TableBody>
//     </MuiTable>
//   );

//   return (
//     <>
//       <SeoOptimization
//         title="उजुरी र निवेदन डायरी किताब"
//         description="उजुरी र निवेदन डायरी किताब"
//       />
//       <div className="flex justify-end py-3  ">
//         <button
//           className="flex justify-end items-center bg-green-200 hover:bg-green-400  rounded-xl p-3 gap-2 border-2   "
//           onClick={handlePrint}
//         >
//           <AiOutlineDownload size={20} />
//           EXCEL मा लैजानुहोस
//         </button>
//       </div>
//       <div className="flex-col pt-4 bg-[#F0F1F5] px-3 ">
//         <div
//           className="flex flex-col xl:flex-row my-10 gap-8"
//           ref={componentRef}
//         >
//           <div className="bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] rounded-xl p-5 w-full ">
//             <div className="flex justify-between pb-10  ">
//               <div>
//                 <Image
//                   src="https://res.cloudinary.com/dg1opyudu/image/upload/v1678796501/SDIMS/Emblem_of_Nepal_c3mw8w.png"
//                   height={120}
//                   width={120}
//                   alt="nagarpalika logo"
//                   priority
//                 />
//               </div>
//               <div>
//                 <div className="text-2xl font-extrabold text-center">
//                   श्री फिदिम गाउँपालिका,कानूनी मामिला प्रणाली
//                 </div>
//                 <div className="text-xl font-bold text-center ">
//                   न्यायिक समिती
//                 </div>
//                 <div className="text-center font-bold ">
//                   उजुरी र निवेदन डायरी किताब
//                 </div>
//               </div>
//               <div className="text-xl font-bold pt-20">मिति : {inNepali}</div>
//             </div>
//             <ListViewPageDesign>
//               {loading ? <LoadingSpinner /> : locale}
//             </ListViewPageDesign>
//           </div>

//           <br />
//         </div>

//         <br />
//       </div>
//     </>
//   );
// }
// const tableHeadData = [
//   { id: "id", name: "क्र.नं.	" },
//   { id: "name", name: "दायरी मिति			" },
//   { id: "mamilaName", name: "	विवाद नं				" },
//   { id: "mamilaType", name: "	प्रथम पक्ष (वादी)		" },
//   { id: "mamilaType", name: "	दोश्रो पक्ष(प्रतिवादी)		" },
//   { id: "action", name: "विवाद		" },
//   { id: "action", name: "दस्तखत			" },
//   { id: "action", name: "कोर्ट फि		" },
//   { id: "action", name: "लगाउ मुद्दा	" },
//   { id: "action", name: "फैसला गर्ने प्रकार	" },
//   { id: "action", name: "न्यायिका शाखा	" },
//   { id: "action", name: "मेलमिलापमा गएको		" },
//   { id: "action", name: "कैफियत" },
// ];


//  import Image from "next/image";
//  import { useEffect, useRef, useState } from "react";
//  import { TableBody, TableCell, TableRow } from "@mui/material";
//  import { FaDownload, FaEdit, FaFilePdf, FaPrint } from "react-icons/fa";

//  import { useReactToPrint } from "react-to-print";
//  import { AiOutlineDownload } from "react-icons/ai";
//  import "nepali-datepicker-reactjs/dist/index.css";
//  import BikramSambat from "bikram-sambat-js";
//  import { englishToNepali } from "../../../../utils/utility";
//  import { getUjuriNibedanReport } from "../../../../services/apiServices/legalCase/legalCaseService";
//  import MuiTable from "../../../../components/reusableDesign/muiTableDesign/MuiTable";
//  import ListViewPageDesign from "../../../../components/reusableDesign/ListViewPageDesign";
//  import LoadingSpinner from "../../../../components/reusableDesign/Loading";
//  import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
//  import ReactExport from "react-export-excel";
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// export default function NivedanPatraDhacha() {
//   const aa = new BikramSambat(new Date()).toBS();
//   const inNepali = englishToNepali(aa);
//   const componentRef = useRef();
//   const [apiData, setApiData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       getUjuriNibedanReport().then(({ status, data, message }) => {
//         try {
//           if (status) {
//             setApiData(data);
//             setLoading(false);
//           } else {
//             setLoading(false);
//           }
//         } catch (error) {
//           toast.error(message, {
//             autoClose: 1000,
//           });
//         }
//       });
//     };
//     fetchData();
//   }, []);

//   const handleExportExcel = () => {
//     const data = apiData.map((row) => ({
//       id: row.id,
//       name: `${row?.firstName} ${row?.middleName} ${row.lastName}`,
//       fatherName: row.fatherName,
//       mobileNo: row.mobileNo,
//       // Add other properties as needed
//     }));

//     const fileName = "NivedanPatraDhachaData";
//     const excelFile = (
//       <ExcelFile filename={fileName} element={<></>}>
//         <ExcelSheet data={data} name="Sheet 1">
//           <ExcelColumn label="क्र.नं." value="id" />
//           <ExcelColumn label="दायरी मिति" value="name" />
//           <ExcelColumn label="विवाद नं" value="mamilaName" />
//           <ExcelColumn label="प्रथम पक्ष (वादी)" value="mamilaType" />
//           <ExcelColumn label="दोश्रो पक्ष(प्रतिवादी)" value="mamilaType" />
//           {/* Add other columns as needed */}
//         </ExcelSheet>
//       </ExcelFile>
//     );

//     excelFile.save();
//   };

//   const locale = (
//     <MuiTable tableHead={tableHeadData}>
//       <TableBody>
//         {apiData.map((row, index) => {
//           return (
//             <TableRow key={index} className="hover:bg-[#a0cae7fd]">
//               <TableCell>{englishToNepali(index + 1)}</TableCell>
//               <TableCell>
//                 {`${row?.firstName} ${row?.middleName} ${row.lastName}`}
//               </TableCell>
//               <TableCell>{row.fatherName}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//               <TableCell>{row.mobileNo}</TableCell>
//             </TableRow>
//           );
//         })}
//       </TableBody>
//     </MuiTable>
//   );

//   return (
//     <>
//       <SeoOptimization
//         title="उजुरी र निवेदन डायरी किताब"
//         description="उजुरी र निवेदन डायरी किताब"
//       />
//       <div className="flex justify-end py-3">
//         <button
//           className="flex justify-end items-center bg-green-200 hover:bg-green-400 rounded-xl p-3 gap-2 border-2"
//           onClick={handleExportExcel}
//         >
//           <AiOutlineDownload size={20} />
//           Export to Excel
//         </button>
//       </div>
//       <div className="flex-col pt-4 bg-[#F0F1F5] px-3 ">
//         <div
//           className="flex flex-col xl:flex-row my-10 gap-8"
//           ref={componentRef}
//         >
//           <div className="bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] rounded-xl p-5 w-full">
//             <div className="flex justify-between pb-10">
//               <div>
//                 <Image
//                   src="https://res.cloudinary.com/dg1opyudu/image/upload/v1678796501/SDIMS/Emblem_of_Nepal_c3mw8w.png"
//                   height={120}
//                   width={120}
//                   alt="nagarpalika logo"
//                   priority
//                 />
//               </div>
//               <div>
//                 <div className="text-2xl font-extrabold text-center">
//                   श्री फिदिम गाउँपालिका,कानूनी मामिला प्रणाली
//                 </div>
//                 <div className="text-xl font-bold text-center">
//                   न्यायिक समिती
//                 </div>
//                 <div className="text-center font-bold">
//                   उजुरी र निवेदन डायरी किताब
//                 </div>
//               </div>
//               <div className="text-xl font-bold pt-20">मिति: {inNepali}</div>
//             </div>
//             <ListViewPageDesign>
//               {loading ? <LoadingSpinner /> : locale}
//             </ListViewPageDesign>
//           </div>
//           <br />
//         </div>
//         <br />
//       </div>
//     </>
//   );
// }

// const tableHeadData = [
//   { id: "id", name: "क्र.नं." },
//   { id: "name", name: "दायरी मिति" },
//   { id: "mamilaName", name: "विवाद नं" },
//   { id: "mamilaType", name: "प्रथम पक्ष (वादी)" },
//   { id: "mamilaType", name: "दोश्रो पक्ष(प्रतिवादी)" },
//   { id: "action", name: "विवाद" },
//   { id: "action", name: "दस्तखत" },
//   { id: "action", name: "कोर्ट फि" },
//   { id: "action", name: "लगाउ मुद्दा" },
//   { id: "action", name: "फैसला गर्ने प्रकार" },
//   { id: "action", name: "न्यायिका शाखा" },
//   { id: "action", name: "मेलमिलापमा गएको" },
//   { id: "action", name: "कैफियत" },
// ];


import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { FaDownload, FaEdit, FaFilePdf, FaPrint } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { englishToNepali } from "../../../../utils/utility";
import { getUjuriNibedanReport } from "../../../../services/apiServices/legalCase/legalCaseService";
import MuiTable from "../../../../components/reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../../../components/reusableDesign/ListViewPageDesign";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import * as XLSX from "xlsx";

export default function NivedanPatraDhacha() {
  const aa = new BikramSambat(new Date()).toBS();
  const inNepali = englishToNepali(aa);
  const componentRef = useRef();
  const [apiData, setApiData] = useState([]);
  console.log(apiData,"apiData");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      getUjuriNibedanReport().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchData();
  }, []);

  const handleExportExcel = () => {
    const data = apiData.map((row) => ({
      id: row.id,
      name: `${row?.firstName} ${row?.middleName} ${row.lastName}`,
      fatherName: row.fatherName,
      mobileNo: row.mobileNo,
      // Add other properties as needed
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    saveAsExcelFile(excelBuffer, "NivedanPatraDhachaData");
  };

  const saveAsExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>
                {" "}
                {row.regDate ? englishToNepali(row.regDate) : ""}
              </TableCell>
              <TableCell>
                {" "}
                {row.caseNo ? englishToNepali(row.caseNo) : ""}
              </TableCell>
              <TableCell>
                {" "}
                {row.petitionerDetailViewModelList.map((items) => {
                  return <>{items.fullName},</>;
                })}
              </TableCell>
              <TableCell>
                {" "}
                {row.respondentDetailViewModelList.map((items) => {
                  return <>{items.fullName},</>;
                })}
              </TableCell>
              <TableCell> {row.caseTypeName}</TableCell>

              <TableCell>{row.mobileNo}</TableCell>
              <TableCell>{row.mobileNo}</TableCell>
              <TableCell>{row.mobileNo}</TableCell>
              <TableCell>{row.mobileNo}</TableCell>
              <TableCell>{row.mobileNo}</TableCell>
              <TableCell>{row.mobileNo}</TableCell>
              <TableCell>{row.mobileNo}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );

  return (
    <>
      <SeoOptimization
        title="उजुरी र निवेदन डायरी किताब"
        description="उजुरी र निवेदन डायरी किताब"
      />
      <div className="flex justify-end py-3">
        <button
          className="flex justify-end items-center bg-green-200 hover:bg-green-400 rounded-xl p-3 gap-2 border-2"
          onClick={handleExportExcel}
        >
          <AiOutlineDownload size={20} />
          Export to Excel
        </button>
      </div>
      <div className="flex-col pt-4 bg-[#F0F1F5] px-3 ">
        <div
          className="flex flex-col xl:flex-row my-10 gap-8"
          ref={componentRef}
        >
          <div className="bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] rounded-xl p-5 w-full">
            <div className="flex justify-between pb-10">
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
                  श्री फिदिम गाउँपालिका,कानूनी मामिला प्रणाली
                </div>
                <div className="text-xl font-bold text-center">
                  न्यायिक समिती
                </div>
                <div className="text-center font-bold">
                  उजुरी र निवेदन डायरी किताब
                </div>
              </div>
              <div className="text-xl font-bold pt-20">मिति: {inNepali}</div>
            </div>
            <ListViewPageDesign>
              {loading ? <LoadingSpinner /> : locale}
            </ListViewPageDesign>
          </div>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}

const tableHeadData = [
  { id: "id", name: "क्र.नं." },
  { id: "name", name: "दायरी मिति" },
  { id: "mamilaName", name: "विवाद नं" },
  { id: "mamilaType", name: "प्रथम पक्ष (वादी)" },
  { id: "mamilaType", name: "दोश्रो पक्ष(प्रतिवादी)" },
  { id: "action", name: "विवाद" },
  { id: "action", name: "दस्तखत" },
  { id: "action", name: "कोर्ट फि" },
  { id: "action", name: "लगाउ मुद्दा" },
  { id: "action", name: "फैसला गर्ने प्रकार" },
  { id: "action", name: "न्यायिका शाखा" },
  { id: "action", name: "मेलमिलापमा गएको" },
  { id: "action", name: "कैफियत" },
];
