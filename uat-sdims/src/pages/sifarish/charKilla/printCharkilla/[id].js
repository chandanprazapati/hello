import React, { useEffect, useRef, useState } from "react";
import { englishToNepali } from "../../../../utils/utility";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import Image from "next/image";
import BikramSambat from "bikram-sambat-js";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import {
  getCharKillaUpload,
  printCharKilla,
} from "../../../../services/apiServices/sifarish/charKilla/charKillaService";
import { FaPrint } from "react-icons/fa";

export default function PrintCharkilla() {
  const aa = new BikramSambat(new Date()).toBS();
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const { query } = useRouter();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (query?.id) {
      let receiptPrintApi = () => {
        printCharKilla(query?.id).then((response) => {
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
          {/* <div className="text-lg font-bold pt-20 text-red-600">
            <p className=" indent-2">कीर्तिपुर, काठमाडौं ।</p>
            <p>बागमती प्रदेश, नेपाल ।</p>
          </div> */}
          <div></div>
        </div>
        <div className="flex justify-between pb-10  ">
          <div className=" leading-8">
            <span className=" block">
              <text className=" inline-block font-bold text-red-500">
                पत्र संख्या :
              </text>
              .....
            </span>
            <span className=" block">
              <text className=" inline-block font-bold text-red-500">
                चलानी नं :
              </text>
              .....
            </span>
          </div>
          <div className=" pt-10">
            <text className=" text-xl font-bold block pt-20">
              विषय : सिफारिस सम्बन्धमा।
            </text>
          </div>
          <div className="text-lg font-bold text-red-500">
            मिति : {englishToNepali(aa)}
          </div>
        </div>
        <div>
          <text className=" block">श्री जो जससँग सम्बन्ध छ।</text>
          <text className=" block pt-4 indent-16 text-justify">
            उपरोक्त सम्बन्धमा काठमाडौं जिल्ला कीर्तिपुर नगरपालिका वडा नं. १
            निवासी निवेदक संगिता थापा मेरो नाममा मा.पो.का. कलंकीमा दर्ता
            प्रमाणित रहेको का.जि.कीर्तिपुर वडा नं १ सिट नं 45 कित्ता नं 34 को
            क्षे.फ. 9-0-8 व.मी. जग्गाको चारकिल्ला प्रमाणित माग गर्नु भएकोले
            वितिय प्रयोजनको लागि उल्लेखित कित्ता जग्गाको चारकिल्ला तपसिल बमोजिम
            प्रमाणित गरिन्छ।
          </text>
        </div>
        <div className=" pt-4 leading-8 pl-8">
          <text className=" block underline font-bold">चारकिल्ला</text>
          {apiData?.charKillaPlotDetailViewModelList?.map((items, index) => {
            return (
              <>
                <p>
                  <span className="inline-block text-right">पुर्वः-</span>
                  कित्ता नं.{items?.east}
                </p>
                <p>
                  <span className="inline-block text-right">पश्चिमः-</span>
                  कित्ता नं.{items?.west}
                </p>
                <p>
                  <span className="inline-block text-right">उतरः-</span>
                  कित्ता नं.{items?.north}
                </p>
                <p>
                  <span className="inline-block text-right">दक्षिणः-</span>
                  कित्ता नं.{items?.south}
                </p>
              </>
            );
          })}
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
