import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaDownload, FaEdit, FaFilePdf, FaPrint } from "react-icons/fa";

import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { englishToNepali } from "../../../../utils/utility";
import { getMisilAbhilekhReport } from "../../../../services/apiServices/legalCase/legalCaseService";
import MuiTable from "../../../../components/reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../../../components/reusableDesign/ListViewPageDesign";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

export default function NivedanPatraDhacha() {
  const aa = new BikramSambat(new Date()).toBS();
  const inNepali = englishToNepali(aa);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [apiData, setApiData] = useState([]);
  console.log(apiData, "apiData");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      getMisilAbhilekhReport().then(({ status, data, message }) => {
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

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>

              <TableCell>
                {" "}
                {row.regNum ? englishToNepali(row.regNum) : ""}
              </TableCell>
              <TableCell>
                {" "}
                {row.caseNo ? englishToNepali(row.caseNo) : ""}
              </TableCell>
              <TableCell>
                {" "}
                {row.regDate ? englishToNepali(row.regDate) : ""}
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

              <TableCell>
                {" "}
                {row.judgeFinalDecisionDate
                  ? englishToNepali(row.judgeFinalDecisionDate)
                  : ""}
              </TableCell>
              <TableCell> {row.PunarabedanDartaName}</TableCell>
              <TableCell> {row.PunarabedanDate}</TableCell>
              <TableCell> {row.PunarabedanDate}</TableCell>
              <TableCell> {row.MisilFirtaMiti}</TableCell>
              <TableCell> {row.PunarabedanRemarks}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );

  return (
    <>
      <SeoOptimization
        title="मिसिल अभिलेख किताब"
        description="मिसिल अभिलेख किताब"
      />
      <div className="flex justify-end py-3  ">
        <button
          className="flex justify-end items-center bg-green-200 hover:bg-green-400  rounded-xl p-3 gap-2 border-2   "
          onClick={handlePrint}
        >
          <AiOutlineDownload size={20} />
          EXCEL मा लैजानुहोस
        </button>
      </div>
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
                  श्री फिदिम गाउँपालिका,कानूनी मामिला प्रणाली
                </div>
                <div className="text-xl font-bold text-center ">
                  न्यायिक समिती
                </div>
                <div className="text-center font-bold ">मिसिल अभिलेख किताब</div>
              </div>
              <div className="text-xl font-bold pt-20">मिति : {inNepali}</div>
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
  { id: "id", name: "क्र.नं.	" },
  { id: "name", name: "मिसिल अभिलेख दर्ता नं		" },
  { id: "mamilaName", name: "	उजुरी नं			" },
  { id: "mamilaType", name: "	उजुरी दर्ता मिति		" },
  { id: "mamilaType", name: "	निवेदक		" },
  { id: "action", name: "दोश्रो पक्ष		" },
  { id: "action", name: "उजुरीको बिषय		" },
  { id: "action", name: "निर्णय वा मिलापत्र मिति		" },
  { id: "action", name: "दर्ता गर्ने अधिकारीको नामथर/दस्तखत	" },
  { id: "action", name: "पुनरावेदन परेको मिति		" },
  { id: "action", name: "पुनरावेदन सुन्ने अदालतमा पठाएको मिति	" },
  { id: "action", name: "मिसिल फिर्ता मिति	" },
  { id: "action", name: "कैफियत" },
];
