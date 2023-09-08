import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaDownload, FaEdit, FaFilePdf, FaPrint } from "react-icons/fa";

import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { englishToNepali } from "../../../../utils/utility";
import { getNibedanKoBiwaranReport } from "../../../../services/apiServices/legalCase/legalCaseService";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      getNibedanKoBiwaranReport().then(({ status, data, message }) => {
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
                {row.bisaye}
              </TableCell>
              <TableCell> {englishToNepali(row.jammaNibedakhcount1)}</TableCell>
              <TableCell> {englishToNepali(row.jammaNibedakhcount2)}</TableCell>
              <TableCell> {englishToNepali(row.nirnayeNibedakhcount1)}</TableCell>
              <TableCell> {englishToNepali(row.nirnayeNibedakhcount2)}</TableCell>
              <TableCell> {englishToNepali(row.mailMilapNibedakhcount1)}</TableCell>
              <TableCell> {englishToNepali(row.mailMilapNibedakhcount2)}</TableCell>
              <TableCell> {englishToNepali(row.runningNibedakhcount1)}</TableCell>
              <TableCell> {englishToNepali(row.runningNibedakhcount2)}</TableCell>
              <TableCell> {englishToNepali(row.haltedNibedakhcount1)}</TableCell>
              <TableCell> {englishToNepali(row.haltedNibedakhcount2)}</TableCell>
              <TableCell> {englishToNepali(row.punarabedanNibedakhcount1)}</TableCell>
              <TableCell> {englishToNepali(row.punarabedanNibedakhcount2)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );

  return (
    <>
      <SeoOptimization title="निवेदनको विवरण" description="निवेदनको विवरण" />
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
                <div className="text-center font-bold ">निवेदनको विवरण</div>
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
  { id: "id", name: "सि.नं." },
  { id: "action", name: "विषय			" },
  { id: "id", name: " जम्मा संख्या ४७(१)  " },
  { id: "id", name: "  जम्मा संख्या ४७(२)  " },
  { id: "id", name: "निर्णय,आदेश भएको ४७(१) " },
  { id: "id", name: " निर्णय,आदेश भएको ४७(२) " },
  { id: "id", name: " मेलमिलाप भएको ४७(१)  " },
  { id: "id", name: "मेलमिलाप भएको ४७(२)  " },
  { id: "id", name: " प्रक्रियामा रहेको	 ४७(१)  " },
  { id: "id", name: "प्रक्रियामा रहेको	 ४७(२)  " },
  { id: "id", name: " तामेलीमा रहेको	४७(१)  " },
  { id: "id", name: "तामेलीमा रहेको	४७(२)  " },
  { id: "id", name: " अपिलमा रहेको		 ४७(१)  " },
  { id: "id", name: "अपिलमा रहेको		 ४७(२)  " },
];
