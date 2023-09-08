import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import { useRouter } from "next/router";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import { yojana } from "../../../services/apiServices/planning/yojana/yojanaService";
import { getPrativedanReport } from "../../../services/apiServices/planning/report/reportService";
import { toast } from "react-toastify";
import { englishToNepali } from "../../../utils/utility";
import PlanningHeaderReport from "../../reusableDesign/PlanningHeaderReport";

const Prativedan = () => {
  const aa = new BikramSambat(new Date()).toBS();

  const router = useRouter();
  const componentRef = useRef();
  console.log (componentRef, "componentRef");

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
        getPrativedanReport(yojanaNameValue).then((response) => {
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
      <br />
      <form className="grid lg:grid-cols-2  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
        <div className="font-bold text-lg text-red-600">
          उपभोक्ता समिति प्रतिवेदनको रिपोर्ट सिर्जना गर्न योजनाको नाम छान्नुहोस्
          ||
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
      <div className="flex justify-end">
          <button
            className="flex justify-end items-center bg-white rounded-xl p-3 gap-2"
            onClick={handlePrint}
          >
            <AiOutlineDownload size={20} />
            Download
          </button>
        </div>
        <div
          className="flex flex-col xl:flex-row my-10 gap-8"
          ref={componentRef}
        >
          
          <div className=" bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] rounded-xl p-5 w-full ">
            <div className="flex justify-between pb-10  ">
              <div>
                <Image
                  src="https://res.cloudinary.com/dg1opyudu/image/upload/v1678796501/SDIMS/Emblem_of_Nepal_c3mw8w.png"
                  height={120}
                  width={120}
                  alt="nagarpalika logo"
                />
              </div>
              <div>
               <PlanningHeaderReport/>
              </div>
              <div className="text-xl font-bold pt-20">
                मिति : { englishToNepali(aa) }</div>
            </div>

            <div className="font-bold">आदेश नं:</div>
            <br />

            <div className="flex justify-center flex-col items-center gap-4">
              <div className="text-2xl font-bold">
                विषय: उपभोक्ता समिति गठन गरेको प्रतीबेदन पेश गरेको सम्बन्धमा । ।
              </div>
            </div>

            <div className="py-10 px-10 ">
              <div className="flex flex-col pb-4 gap-2">
                <text>श्रीमान् अध्यक्ष ज्यू,</text>
                <text >फिदिम नगरपालिका</text>
                <text >फिदिम </text>
              </div>

              <div className=" tracking-normal leading-loose text-justify ">
                उपरोक्त सम्बन्धमा यस गाउँपालिकाको गाउँसभाबाट चालु आ.ब{" "}
                {apiData.fiscalYearName ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData.fiscalYearName}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                को लागि स्वीकृत भएको यस को वडा न.{" "}
                {apiData.wardId ? (
                  <span className="font-bold px-1 "> {englishToNepali(apiData.wardId)} </span>
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
                
                योजना कार्यक्रम छनौट भई प्राथामिकतामा परेको हुँदा स्थानीय तहको
                उपभोक्ता समिति गठन परिचालन तथा ब्यावस्थापन सम्बन्धी कार्यविधि
                २०७६ को दफा ४ बमोजिम उक्त
                {apiData.yojanaName ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData.yojanaName}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
               
                आयोजनाबाट प्रत्यक्ष लाभान्वित हुने परिवारको पहिचान गरी त्यस्ता
                घर परिवारको आमभेलाबाट सम्बन्धित आयोजना स्थलमै श्री राम बहादुर
                घर्तिको अध्यक्षतामा ७ (सात सदस्यीय देहाय बमोजिमका उपभोक्ता समिति
                गठन भएको व्यहोरा अनुरोध छ । निजहरूको नागरिकताको प्रमाणपत्रको
                फोटोकपी र मिति  
                {apiData?.samiti?.samitiDate ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {englishToNepali(apiData.samiti.samitiDate)}
                  </span>
                ) : (
                  "२०७../..../...."
                )}{" "}
                
                  को आमभेलाको बैठकबाट गठन भएको
                उपभोक्ता समितिको निर्णयको छाया प्रति यसै प्रतिवेदन साथ संलग्न छ
                ।
              </div>
            </div>

            <div className="pb-40">
              <table className="border border-slate-600 w-full  ">
                <thead>
                  <tr>
                    <th className="border border-slate-600 ">क्र.सं.</th>
                    <th className="border border-slate-600 "> नाम</th>
                    <th className="border border-slate-600 ">पद</th>
                    <th className="border border-slate-600 ">ठेगाना</th>
                    <th className="border border-slate-600 ">बाबु को नाम </th>
                    <th className="border border-slate-600 ">उमेर</th>
                    <th className="border border-slate-600 ">सम्पर्क नं.</th>
                  </tr>
                </thead>

                <tbody>

                  {apiData?.samiti?.samitiMemberDetaillist?.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-slate-600 text-center">
                        {englishToNepali(index + 1)}
                      </td>
                      <td className="border border-slate-600 text-center">
                        {item.memberName}
                      </td>
                      <td className="border border-slate-600 text-center">
                        {item.padaName}
                      </td>
                      <td className="border border-slate-600 text-center">
                        {item.address}
                      </td>
                      <td className="border border-slate-600 text-center">
                        {item.fatherName}
                      </td>
                      <td className="border border-slate-600 text-center">
                        {englishToNepali(item.age)}
                      </td>
                      <td className="border border-slate-600 text-center">
                        {englishToNepali(item.phoneNo)}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            <div className=" px-0 lg:px-10 flex justify-around">
              <div>
                <div>-----------------------------</div>
                <div className="flex justify-center font-bold">पेश गर्ने</div>
                <div className="flex justify-center font-bold">योजना</div>
              </div>

              <div>
                <div>-----------------------------</div>
                <div className="flex justify-center  font-bold">जांच गर्ने</div>
                <div className="flex justify-center  font-bold">प्राविधिक</div>
              </div>

              <div>
                <div>-----------------------------</div>
                <div className="flex justify-center  font-bold">रुजु गर्ने</div>
                <div className="flex justify-center  font-bold">आलेप</div>
              </div>

              <div>
                <div>-----------------------------</div>
                <div className="flex justify-center  font-bold">सदर गर्ने</div>
                <div className="flex justify-center  font-bold">प्रमुख प्रशासकीय अधिकृत</div>
              </div>
            </div>
          </div>
          <br />
        </div>

        
      </div>
    </>
  );
};

export default Prativedan;
