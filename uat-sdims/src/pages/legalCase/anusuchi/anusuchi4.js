import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import {
  getIndexCase,
  getLegalAanusuchi,
} from "../../../services/apiServices/legalCase/legalCaseService";
import { office } from "../../../services/apiServices/common/office/officeService";
import { useReactToPrint } from "react-to-print";
import { englishToNepali } from "../../../utils/utility";

export default function AnusuchiFour() {
  // to get the caseList
  const [apiDataCase, setApiDataCase] = useState([]);
  console.log(apiDataCase, "apiDataCase");
  const [caseId, setCaseId] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(caseId, "apiDataCase");

  useEffect(() => {
    const fetchedData = async () => {
      getIndexCase(17).then(({ status, data, message }) => {
        try {
          if (status) {
            setApiDataCase(data);
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

  const handleCase = (e) => {
    setCaseId(e.target.value);
  };

  const caseOptions = apiDataCase.map((item) => {
    return (
      <option value={item.id} key={item.id}>
        {item.caseTypeName}
      </option>
    );
  });

  // to set the office data
  const [apiDataOffice, setApiDataOffice] = useState([]);

  useEffect(() => {
    const fetchedData = () => {
      office().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiDataOffice(data);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiDataOffice]);

  //   fetching api for aanusuchi
  const [apiData, setApiData] = useState([]);

  console.log(apiData, "apiData");

  useEffect(() => {
    let fetchedData = () => {
      getLegalAanusuchi(16).then((response) => {
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
    fetchedData();
  }, [caseId, setApiData, setLoading]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <form>
        <SeoOptimization title="अनुसूची –४" />
        <div className="pt-4">
          <div className="grid lg:grid-cols-3  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
            <div className="font-bold text-lg ">
              विवाद / उजुरीको अनुसूची –२का रिपोर्ट सिर्जना गर्न विवाद / उजुरी
              अनिवार्य छान्नुहोस् ||
            </div>

            <div className="relative z-0 w-full  group">
              <select
                onChange={handleCase}
                value={caseId}
                className="peer requiredField"
              >
                <option value="">---विवाद / उजुरी छान्नुहोस् ---</option>

                {caseOptions}
              </select>
              <label className="label">
                विवाद / उजुरी
                <span className="requiredField">*</span>
              </label>
            </div>
          </div>
        </div>
      </form>

      <div className="flex justify-end py-4 ">
        <button
          className="flex justify-end items-center bg-gray-200 rounded-xl p-3 px-5 gap-2"
          onClick={handlePrint}
        >
          <AiOutlineDownload size={20} />
          Print
        </button>
      </div>

      <div ref={componentRef}>
        <div className="  px-7">
          <div className="border-2 border-b py-20">
            <div className="text-center">
              <p className=" leading-1 text-sm">
                अनुसूची -४ <br /> (दफा २१ को उपदफा (२) सँग सम्बन्धित) <br />
                उजुरीको ढाँचा
              </p>
              <p className="py-6 leading-10 text-lg font-bold">
                {apiDataOffice?.map((items, index) => {
                  return (
                    <div key={index}>
                      {items?.palikaName},कानूनी मामिला प्रणाली न्यायिक समिती
                      समक्ष पेश गरेको
                    </div>
                  );
                })}{" "}
                <br /> निवेदन -पत्र
              </p>
              <div className="py-4 text-justify px-4 text-sm">
                {apiData?.petitionerrViewModelList?.map((items, index) => {
                  return (
                    <div key={index}>
                      <span className="font-bold"> {items?.districtName} </span>
                      , जिल्ला{" "}
                      <span className="font-bold"> {items?.palikaName} </span> ,
                      वडा न.{" "}
                      <span className="font-bold">
                        {" "}
                        {englishToNepali(items?.wardNo)}मा{" "}
                      </span>{" "}
                      बस्ने को नाति/नातिनी को छोरा/छोरी/श्रीमती वर्ष{" "}
                      <span className="font-bold">
                        {" "}
                        {englishToNepali(items?.age)}{" "}
                      </span>{" "}
                      को <span className="font-bold"> {items?.fullName} </span>{" "}
                      निवेदक (प्रथम पक्ष) मोबाईल न{" "}
                      <span className="font-bold">
                        {" "}
                        {englishToNepali(items?.mobile)}{" "}
                      </span>
                    </div>
                  );
                })}
              </div>

              <span className="py-8 font-bold">विरुद्ध</span>

              <div className="py-4 text-justify px-4 text-sm ">
                {apiData?.respondenttViewModelList?.map((items, index) => {
                  return (
                    <div key={index}>
                      <span className="font-bold"> {items?.districtName} </span>
                      , जिल्ला{" "}
                      <span className="font-bold"> {items?.palikaName} </span> ,
                      वडा न.{" "}
                      <span className="font-bold">
                        {" "}
                        {englishToNepali(items?.wardNo)}मा{" "}
                      </span>{" "}
                      बस्ने को नाति/नातिनी को छोरा/छोरी/श्रीमती वर्ष{" "}
                      <span className="font-bold">
                        {" "}
                        {englishToNepali(items?.age)}{" "}
                      </span>{" "}
                      को <span className="font-bold"> {items?.fullName} </span>{" "}
                      निवेदक (प्रथम पक्ष) मोबाईल न{" "}
                      <span className="font-bold">
                        {" "}
                        {englishToNepali(items?.mobile)}{" "}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="px-4 text-sm">
              <p className="leading-10">
                <span>
                  विषय: <strong> {apiData?.subject} </strong>
                </span>
                <br />म निम्न वुदाहरुमा लेखिए बमोजिम निवेदन गर्दछु :
              </p>
              <div className=" flex flex-col" >
                <text>
                  {" "}
                  १. म निवेदक <span> {apiData?.remarks} </span> बिवाद निरुपणका
                  लागी यो निवेदन दिना आएको छु ।{" "}
                </text>
                <br />
                <text>
                  २. यस समितिबाट दोस्रो पक्ष झिकाई जे जो बुझ्नुपर्छ बुझी विवाद
                  निरुपण गराईपाउ ।{" "}
                </text>
                <br />
                <text>
                  {`३. यस बूढीगंगा गाउँपालिका,कानूनी मामिला प्रणाली बाट जारी
              भएको " न्यायिक समिती ( गठन तथा कार्य संचालन ) ऐन्, २०७८" को दफा
              बमोजिम निवेदन दस्तुर रु.....निवेदन साथ दाखिल गरेको छु ।`}
                </text>
                <br/>
                <text>
                 {` ४. यो निवेदन " न्यायिक समिती (गठन तथा कार्य संचालन )
                  ऐन्,२०७८"को दफा`}
                  <span className="font-bold"> {apiData?.subject} </span> अनुसार यसै समिती को अधिकार क्षेत्र भित्र पर्दछ ।
                  
                </text>

                <br />
                <text>
                  ५. यो निवेदन हद म्याद भित्रै छ र म निवेदक लाई यस विषयमा निवेदन
                  दिने हक दैइ या प्रप्त छ ।
                </text>
                <br />
                <text>
                  ६. यस विषयमा अन्यत्र केहि कतै कुनै पनि निकय मा कुनै प्रकर को
                  निवेदन दिएको छैन ।
                </text>
                <br />

                <text>
                  ७. यस विषयमा सुन्ने साक्षी हरुलाई न्यायिक समिती ले खोजेको
                  बेलामा उपस्थित गराउने छु 
                </text>
                <br />
                <text>
                  क.
                </text>
                <br />

                <text>
                  ख. 
                </text>
                <br />

                <text>
                  ८. यस्मा लेखिएका व्यहोरा ठिक साचो सत्य हुन्,झुटा ठहरे कानुन
                  बमोजिम सजाय भोग न तयार छु । 
                </text>

                <br />
                <text>
                  इती संवत
                  <strong>२०७९</strong> साल <strong> ०७</strong> महिना
                  <strong> १६</strong>
                  गते......रोज शुभम ।
                </text>
              </div>
            </div>
            <div className="flex justify-end">
              <p className="px-10 py-5 leading-5 text-sm">
                निवेदक <br /> 
                {apiData?.petitionerrViewModelList?.map((items,index)=>{
                  return(
                    <div key={index}>
                    नाम: <span className="font-bold" > {items?.fullName}
                       </span  >  
                    </div>
                  )
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
