import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import { englishToNepali } from "../../../../utils/utility";
import BikramSambat from "bikram-sambat-js";
import { FaPrint } from "react-icons/fa";
import { useRouter } from "next/router";
import { printsAdibasi } from "../../../../services/apiServices/sifarish/aadiwasiJanajaati/aadiwasiJanjatiService";
import { useReactToPrint } from "react-to-print";

export default function PrintAdivasi() {
  const aa = new BikramSambat(new Date()).toBS();
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const componentRef = useRef();
  const { query } = useRouter();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (query?.id) {
      let receiptPrintApi = () => {
        printsAdibasi(query?.id).then((response) => {
          try {
            response.status === true;
            {
              setApiData(response.data);
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
          }
        });
      };
      receiptPrintApi();
    }
  }, [query?.id]);

  return (
    <>
      <div
        className=" bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] rounded-xl p-5 w-full h-auto"
        ref={componentRef}
      >
        <div className="flex  gap-48 pb-10  ">
          <div>
            <Image
              src="https://res.cloudinary.com/dg1opyudu/image/upload/v1678796501/SDIMS/Emblem_of_Nepal_c3mw8w.png"
              height={120}
              width={120}
              alt="nagarpalika logo"
            />
          </div>

          <PlanningHeaderReport />
          <div></div>
        </div>
        <div className="flex justify-between pb-10  ">
          <div className=" leading-8">
            <span className=" block">
              <text className=" inline-block font-bold">पत्र संख्या :</text>
              .....
            </span>
            <span className=" block">
              <text className=" inline-block font-bold">चलानी नं :</text>
              .....
            </span>
          </div>
          <div className=" pt-10">
            <text className=" text-xl font-bold">
              विषय : आदिवासीको सिफारिस।
            </text>
          </div>
          <div className="text-lg font-bold">मिति : {englishToNepali(aa)}</div>
        </div>
        <div>
          <text className=" block">श्री जिल्ला प्रशासन कार्यालय,</text>
          <text className=" block">कीर्तिपुर, काठमाडौं ।</text>
          <text className=" block pt-4 indent-16 text-justify">
            उपरोक्त सम्बन्धमा जिल्ला काठमाडौं कीर्तिपुर नगरपालिका वडा नं. १
            बस्ने dg को नाति dg को छोरा gdgdf ले म नेपालको सूचिकृत आदिवासी भित्र
            पर्ने भएको हुँदा उक्त ब्यहोरा प्रमाणित गराउनका लागि सिफारिस गरिपाउँ
            भनि यस कार्यालयमा निवेदन दिनुभएको हुँदा सोही बमोजिम उक्त ब्यहोरा
            निजको फोटो टाँस गरि प्रमाणित गरिदिनुहुन सिफारिस साथ अनुरोध छ ।
          </text>
        </div>
        <div className=" text-right pt-10">
          <text className=" block">.......................</text>
          <text className=" block">हर्ष महर्जन</text>
          <text className=" block font-bold text-lg">वडा अध्यक्ष</text>
        </div>
        <div className="border-t-2 border-red-600">
          <text className=" block text-center text-red-500">
            फोन नं.: ९७७-१-४३३१७६५, फ्याक्स नं.: ९७७-१-४३३१३८१, E-mail:
            ward1.kirtipur@gmail.com
          </text>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="flex justify-end items-center bg-blue-300 hover:bg-blue-400 rounded-xl p-3 gap-2"
          onClick={handlePrint}
        >
          <FaPrint size={20} />
          प्रिन्ट
        </button>
      </div>
    </>
  );
}
