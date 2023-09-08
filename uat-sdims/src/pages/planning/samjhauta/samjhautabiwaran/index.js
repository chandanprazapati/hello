import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import { useRouter } from "next/router";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");

import { yojana } from "../../../../services/apiServices/planning/yojana/yojanaService";
// import {  getSamjhautaGaridineReport } from "../../../services/apiServices/planning/report/reportService";
import { fiscal } from "../../../../services/apiServices/common/fiscal/fiscalService";
import { toast } from "react-toastify";
import ViewPage from "../../../../components/viewPage/ViewPage";
import { getSamjhautaReport } from "../../../../services/apiServices/planning/report/reportService";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import { englishToNepali } from "../../../../utils/utility";

const Index = () => {
  const aa = new BikramSambat(new Date()).toBS();

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
      getSamjhautaReport(fiscalYearid, projectName).then((response) => {
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
  }, [fiscalYearid, projectName]);

  return (
    <>
      <form className="grid lg:grid-cols-3  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
        <div className="font-bold text-lg text-red-600">
          सम्झौताको रिपोर्ट सिर्जना गर्न योजनाको नाम र आर्थिक वर्ष छान्नुहोस् ||
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
                <option key={index} value={items?.yojanaSetupId}>
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
              <div className="text-xl font-bold pt-20">मिति : {englishToNepali(aa)}</div>
            </div>

            <div className="font-bold leading-8 ">
              <div>पत्र संख्या : </div>
              <div>चलानी नम्बर :</div>
            </div>

            <div className="text-2xl font-bold flex justify-center">
              विषय: सम्झौता सम्बन्धमा।
            </div>
            <div className="py-10 px-10 ">
              <text>श्रीमान्</text> <br />
              <div className="text-justify tracking-normal leading-loose ">
                नगर स्तरीय कार्यक्रमबाट चालु आ.व.
                {apiData?.fiscalYearName ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.fiscalYearName}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                मा कार्यको लागि रु विनियोजन भई कार्यक्रम स्वीकृत भएको देखिन्छ।
                यस निर्माण/मर्मत कार्यको लागि उपभोक्ता समिति गठनभई आएको र
                प्राविधिक बाट जम्मा रु
                {apiData?.project_estimated_Amount ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.project_estimated_Amount} /-{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                को इस्टिमेट पेश भएकोमा नगरपालिका अनुदान शीर्षकबाट रु
               
                मध्य कन्तिन्जेंसी रु
                {apiData?.municipality ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.municipality} /-{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                ,मर्मत सम्भार रु
                {apiData?.marmatSambhar_Amount ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.marmatSambhar_Amount} /-{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                कटाई बाँकि रु{" "}
                {apiData?.total_Amount_Source ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.total_Amount_Source} /-{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                र श्रमदान रु
                {apiData?.loan_Grant ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.loan_Grant} /-{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                व्यहोर्ने गरी पेश भएबमोजिम योजना संचालनमा गर्नुपर्ने देखिन्छ अत
                उ.स.ले.रु{" "}
                {apiData?.project_estimated_Amount  ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.project_estimated_Amount} /-{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                बाट नियमानुसार करकट्टी गरी बाँकि रकम पाउने गरी वडा कार्यालयको
                योजना सम्झौताको गर्ने सिफारिस समेतको आधारमा बाग्लुंग नगरपालिका
                को कार्यालय र उ.स विच दुइ पक्षीय सम्झौता गरि कार्यादेश दिने र
                कार्यप्रगतिको आधारमाप्राबिधिक मूल्यांकन अनुसार रकम भुक्तानी गरी
                निर्णयार्थ राय पेश गरेको छु ।
              </div>
            </div>

            <div className="px-10 font-bold flex flex-col gap-3 ">
              <text className=" text-xl">अन्य राय</text>
              <text className=" underline ">असंलग्न कागजातहरु</text>
            </div>
            <div className="px-10 pt-4 gap-3 flex flex-col ">
              <div className="flex justify-between">
                <text>१.वडा सिफारिस</text>
                <div>भएको/नभएको</div>
              </div>

              <div className="flex justify-between">
                <text>२.उ.स.निर्माण</text>
                <div>भएको/नभएको</div>
              </div>

              <div className="flex justify-between">
                <text>३.लागत स्टिमेट</text>
                <div>भएको/नभएको</div>
              </div>

              <div className="flex justify-between">
                <text>४.योजना सुरु हुनु पूर्वको फोटो</text>
                <div>भएको/नभएको</div>
              </div>

              <div className="flex justify-between">
                <div>
                  <text>५.प्राबिधिक कागजातहरु</text>
                  <div className="flex flex-col gap-2 px-6">
                    <text>क) रेट एनालाइसिस</text>
                    <text>ख) डीटेल्ड इस्टमेट</text>
                    <text>ग) खर्चको तारेज</text>
                  </div>
                </div>
                <div>भएको/नभएको</div>
              </div>
            </div>

            <div className="px-10 flex justify-around pt-10 ">
              <div className="flex flex-col">
                <text>----------------------------</text>
                <text className="font-bold pl-12 ">पेश गर्ने</text>
              </div>

              <div className="flex flex-col">
                <text>----------------------------</text>
                <text className="font-bold pl-12 ">सिफारिस गर्ने</text>
              </div>

              <div className="flex flex-col">
                <text>----------------------------</text>
                <text className="font-bold pl-12 ">स्वीकृत गर्ने</text>
              </div>
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

export default Index;
