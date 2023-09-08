import React, { useEffect, useRef, useState } from "react";
import { office } from "../../../services/apiServices/common/office/officeService";
import {
  getIndexCase,
  getLegalAanusuchi,
} from "../../../services/apiServices/legalCase/legalCaseService";
import { englishToNepali } from "../../../utils/utility";
import { AiOutlineDownload } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

export default function Anusuchitwo() {
  // to get the caseList
  const [apiDataCase, setApiDataCase] = useState([]);
  const [caseId, setCaseId] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(caseId, "apiDataCase");

  useEffect(() => {
    const fetchedData = async () => {
      getIndexCase().then(({ status, data, message }) => {
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

  //   fetching api for aanusuchi1
  const [apiData, setApiData] = useState([]);

  

  useEffect(() => {
    let fetchedData =  () => {

        getLegalAanusuchi(caseId).then((response) => {
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
    <>
      <form>
        <SeoOptimization title="अनुसूची –२" />
        <div className="pt-4" >
        <div className="grid lg:grid-cols-3  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="font-bold text-lg text-red-600">
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
      <div className="">
        <div ref={componentRef}>
          <div className="border-2 border-b py-20">
            <div className="text-lg font-bold text-center">
              <p className=" leading-10">
                अनुसूची –२ <br /> दफा १३ सँग सम्बन्धित <br />
                {apiDataOffice?.map((items, index) => {
                  return (
                    <div key={index}>
                      {items?.palikaName},कानूनी मामिला प्रणाली{" "}
                    </div>
                  );
                })}
                निर्वाचन अधिकृतको कार्यालय <br />
                {apiDataOffice?.map((items, index) => {
                  return <div key={index}>{items?.districtName}</div>;
                })}
              </p>
              <p className="py-6">प्रमाण-पत्र</p>
            </div>
            <p className="leading-6 px-10 text-justify text-sm">
              {apiDataOffice?.map((items, index) => {
                return (
                  <div key={index}>
                    <span className="font-bold">{items?.palikaName}</span>
                    ,कानूनी मामिला प्रणाली, न्यायिक समिति (गठन तथा कार्यसञ्चालन)
                    ऐन, २०७८ को दफा डट बमोजिम मिति
                    {apiData.firstHearingDate ? (
                      <span className="px-2 font-bold ">
                        {englishToNepali(apiData.firstHearingDate)}
                      </span>
                    ) : (
                      <span className="px-2">............................</span>
                    )}
                    मा भएको निर्वाचनमा तपाईं श्री{" "}
                    {apiData.firstHearingDate ? (
                      <span className="px-2 font-bold ">
                        {englishToNepali(apiData.firstHearingDate)}
                      </span>
                    ) : (
                      <span className="px-2">............................</span>
                    )}
                    न्यायिक समिति सदस्य पदमा निर्वाचित हुनु भएकोले यो प्रमाण
                    पत्र प्रदान गर्दछु। यहाँको सफल कार्यकालको लागि हार्दिक
                    शुभकामना।{" "}
                  </div>
                );
              })}
            </p>
            <div className="flex justify-end">
              <p className="px-10 py-5">
                (...................) <br />
                निर्वाचन अधिकृत <br />
                मितिः ...................
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
