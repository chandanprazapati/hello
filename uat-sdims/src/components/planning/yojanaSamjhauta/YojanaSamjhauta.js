import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { yojana } from "../../../services/apiServices/planning/yojana/yojanaService";
import { getSamjhautaGaridineReport } from "../../../services/apiServices/planning/report/reportService";
import { toast } from "react-toastify";
import { englishToNepali } from "../../../utils/utility";
import PlanningHeaderReport from "../../reusableDesign/PlanningHeaderReport";

const YojanaSamjhauta = () => {
  const aa = new BikramSambat(new Date()).toBS();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  // for yojanaNameId
  const [yojanaNameId, setYojanaNameId] = useState([]);
  const [yojanaNameValue, setYojanaNameValue] = useState("");

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

  //   for genrate receipt according to id

  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    if (yojanaNameValue) {
      let receiptApiData = () => {
        getSamjhautaGaridineReport(yojanaNameValue).then((response) => {
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
    }
  }, [yojanaNameValue]);

  return (
    <>
      <form className="grid lg:grid-cols-2  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
        <div className="font-bold text-lg text-red-600">
          योजना सम्झौता गरिदिनेको रिपोर्ट सिर्जना गर्न योजनाको नाम छान्नुहोस् ||
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label className="label text-blue-900 ">योजनाको नाम</label>
          <select
            onChange={handleYojanaName}
            value={yojanaNameValue}
            className="peer"
            required
          >
            <option value={""} selected disabled>
              ---- योजनाको नाम छान्नुहोस् ----
            </option>

            {yojanaNameId.map((items, index) => {
              return (
                <option key={index} value={items?.yojanaSetupId}>
                  {items.yojanaName}
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
              <div>
                <PlanningHeaderReport/>
              </div>
              <div className="text-xl font-bold pt-20">
                मिति : {englishToNepali(aa)}
              </div>
            </div>

            <div className="font-bold ">
              <div>आदेश नं: </div>
            </div>

            <div className="text-2xl font-bold flex justify-center">
              विषय: उपभोक्ता समिति गठन गरेको प्रतीबेदन पेश गरेको सम्बन्धमा।
            </div>
            <div className="py-10 px-10 ">
              <div className="text-justify tracking-normal leading-loose ">
                यस बाग्लुंग नगरपालिका को गाउँसभाबाट चालू आ.ब.
                {apiData.fiscalYearName ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData.fiscalYearName}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                को लागि स्वीकृत भएको यस गाउँपालिकाको वडा नं.{" "}
                {apiData.wardId ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {englishToNepali(apiData.wardId)}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                मा
                {apiData.yojanaName ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData.yojanaName}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                आयोजना/कार्याक्रम छनौट भई सो आयोजना/कार्याक्रमको लागि रु
                {apiData.estimatedAmount ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {englishToNepali(apiData.estimatedAmount)} /-{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                वजेट विनियोजन भई सकेको र नियमानुसार उपभोक्ता समिति गठन भई सोको
                प्रतिवेदन गाउँपालिकामा पेश भैसकेकोले उपभोक्ता समितिको अध्यक्ष
                श्री ................. लाई सम्झौता गर्न पठाईएको छ । नियमानुसार
                सम्झौता गरी कार्यदेश दिनु हुन अनुरोध छ ।
              </div>
            </div>

            <div className="flex flex-col leading-loose items-end px-10 ">
              <text> हस्ताक्षर : ................................... </text>
              <text> नाम: : ................................... </text>
              <text className="px-10 "> (वडा अध्यक्ष)</text>
            </div>
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

export default YojanaSamjhauta;
