import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import { fiscal } from "../../../../services/apiServices/common/fiscal/fiscalService";
import { toast } from "react-toastify";
import { getSamjhautaReport } from "../../../../services/apiServices/planning/report/reportService";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import {englishToNepali} from "../../../../utils/utility";
import { planningSamjhauta } from "../../../../services/apiServices/planning/planningSamjhauta/planningSamjhautaService";
import { employee } from "../../../../services/apiServices/employee/employeesetup/employeeService";
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
      planningSamjhauta().then((response) => {
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

  const [apiDataEmployee, setApiDataEmployee] = useState([]);
  const [empId, setApiDataEmployeeId] = useState("");

  const handleEmployee = (e) => {
    setApiDataEmployeeId(e.target.value);
  };

  useEffect(() => {
    let employeeApiData = () => {
      employee().then((response) => {
        try {
          response.status === true;
          {
            setApiDataEmployee(response.data);
          }
        } catch (error) {
          toast.error(response.message, {
            autoClose: 1000,
          });
        }
      });
    };
    employeeApiData();
  }, [setApiDataEmployee]);

  //   for genrate receipt according to id

  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    let receiptApiData = () => {
      getSamjhautaReport(fiscalYearid, projectName,empId).then((response) => {
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
  }, [fiscalYearid, projectName,empId]);

  return (
    <>
      <form className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
        <div className="font-bold text-lg text-red-600">
          कार्य आदेश दिएको रिपोर्ट सिर्जना गर्न योजनाको नाम र आर्थिक वर्ष
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
                <option key={index} value={items?.planningSamjhautaId}>
                  {items.project_Name}
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
          <label className="label text-blue-900 ">कर्मचारीको नाम</label>
          <select
            onChange={handleEmployee}
            value={empId}
            className="peer"
            required
          >
            <option value={""} selected disabled>
              ---- कर्मचारीको नाम छान्नुहोस् ----
            </option>

            {apiDataEmployee.map((items, index) => {
              return (
                <option key={index} value={items?.id}>
                 {items.firstName} {items.middleName} {items.lastName} [
                {englishToNepali(items.empCode)}]
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
              
              <PlanningHeaderReport/>
              <div className="text-xl font-bold pt-20">मिति : {englishToNepali(aa)}</div>
            </div>

            <div className="font-bold leading-8 ">
              <div>पत्र संख्या : </div>
              <div>चलानी नम्बर :</div>
            </div>

            <div className="text-2xl font-bold flex justify-center">
              विषय: कार्य आदेश दिएको ।
            </div>
            <div className="py-10 px-10 ">
              <text>श्रीमान्</text> <br />
              <text className="text-center tracking-normal leading-loose ">
                उपरोक्त विषयमा आ.व
                {apiData?.fiscalYearName ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.fiscalYearName}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                को{" "}
                
                कार्यक्रमवाट
                {apiData?.project_Name ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.project_Name}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                उ.स.त्रि.न.पा बीच
                {apiData?.fiscalYearName ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.fiscalYearName}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                कार्यको लागि मिति
                {apiData?.project_Start_Date ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData?.project_Start_Date}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                मा भएको सम्झोेता बमोजिम यस कार्यलयको प्राविधिकको प्रत्यक्ष
                निर्देशनमा गुणस्तरीय र सम्झोेतामा उल्लेख भएको समय भित्र नै योजना
                सम्पन्न गर्न हुन कार्यदेश दिइएको छ ।
              </text>
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
