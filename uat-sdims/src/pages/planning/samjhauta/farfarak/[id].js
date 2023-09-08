import React, { useEffect, useRef, useState } from "react";
import ViewPage from "../../../../components/viewPage/ViewPage";
import { useReactToPrint } from "react-to-print";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import { AiOutlineDownload } from "react-icons/ai";
import { useRouter } from "next/router";
import Image from "next/image";
import { getSamjhautaFarfarakReport } from "../../../../services/apiServices/planning/report/reportService";
import { toast } from "react-toastify";

const FarFarakById = () => {
  const aa = new BikramSambat(new Date()).toBS();

  const router = useRouter();
  const userId = router?.query?.id;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //   for genrate receipt according to id

  const [apiData, setApiData] = useState([]);

  

  useEffect(() => {
    if (userId) {
      let receiptApiData = () => {
        getSamjhautaFarfarakReport(userId).then((response) => {
          try {
            response.status === true;
            {
              setApiData(response.data);
            }
          } catch (error) {
            toast.error(response.message, {
              autoClose: 1000,
            });
          }
        });
      };
      receiptApiData();
    }
  }, [userId]);

  return (
    <>
      <div className="flex-col pt-4 bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] px-3 ">
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
                />
              </div>
              <div>
                <div className="text-2xl font-extrabold">फिदिम नगरपालिका</div>
                <div className="text-xl font-bold text-center ">
                  Fidim Municipality
                </div>
                <div className="text-center">नगरकार्यपालिकाको कार्यालय</div>
                <div className="text-center">बाग्लुंग</div>
                <div className="text-center">गण्डकी प्रदेश</div>
              </div>
              <div className="text-xl font-bold pt-20">मिति : {aa}</div>
            </div>

            <div className="flex  flex-col gap-4">
              <div className="text-xl font-bold">पत्र संख्या : २०७९/०८०</div>
              <div className="text-xl font-bold">चलानी नम्बर :</div>
            </div>

            <div>
              <text className="text-2xl font-bold items-center flex justify-center">
                विषय: योजना फरफारक गरिदिने बारे ।
              </text>
            </div>

            <div className="py-10 px-10 ">
              <text className="text-center tracking-normal leading-loose ">
                प्रस्तुत विषयमा यस चौंरीदेउराली गाउँपालिका को गाउँसभाले स्वीकृत
                गरेको २०७९/०८० मा वडा नं. ६ को योजना/ संचालन गर्नका लागि
                उपभोक्ता समिति र गाउँपालिकाका कार्यालय बीच मिति १२/१४/२०७९
                सम्झौता भएको र उक्त योजना मिति ४/५/२०२३ गते योजनाको सम्पूर्ण काम
                सम्पन्न भएको सम्बन्धित सबै कागजात संलग्न गरी भुक्तानीको लागि
                निवेदन पेश गर्दछु योजना फरफारको आग गाउंपालिकामा सिफारिस गरिदिन
                हुन अनुरोध छ ।
              </text>
            </div>

            <div className="flex justify-around">
              <div className="flex flex-col gap-2">
                <text className="font-bold">प्राविधिक शाखाको तर्फबाट :</text>
                <text> नाम : .............................. </text>
                <text>पद : ................................</text>
                <text>हस्ताक्षर : </text>
              </div>

              <div className="flex flex-col gap-2">
                <text className="font-bold">योजना शाखाको तर्फबाट :</text>
                <text> नाम : .............................. </text>
                <text>पद : ................................</text>
                <text>हस्ताक्षर : </text>
              </div>

              <div className="flex flex-col gap-2">
                <text className="font-bold">कायालयको तर्फबाट :</text>
                <text> नाम : .............................. </text>
                <text>पद : ................................</text>
                <text>हस्ताक्षर : </text>
              </div>
            </div>

            <div className="pt-10 pb-4 pl-6 text-xl font-bold">
              संलग्न कागजातहरु :
            </div>

            <div className="flex flex-col pl-28 gap-2 font-semibold " >
                <text>१. उपभोक्ता समितिको बैठकबाट कार्य सम्पन्न भएको निर्णय ।</text>
                <text>२. आम्दानी खर्च अनुमोदन गरिएको निर्णय ।</text>
                <text>३. आय व्ययको सार्वजनिकिकरण गरिएको निर्णय एवं प्रतिवेदनहरु ।</text>
                <text>४. उपभोक्ता समितिको भौतिक तथा वित्तिय प्रतिवेदन।</text>
                <text>५. प्राविधिक मुल्यांकन तथा कार्य सम्पन्न प्रतिवेदन ।</text>
                <text>६. अनुगमन समितिबाट योजना अनुगमन गरिएको प्रतिवेदन ।</text>
                <text>७. विनियोजित रकम निकासा गरिदिने बारेको उपभोक्ता समितिको निर्णय ।</text>
                <text>८. काम सम्पन्न भएको वडा कार्यालयको सिफारिस पत्र ।</text>
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
        <br/>
      </div>
    </>
  );
};

export default FarFarakById;
