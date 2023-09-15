import BikramSambat from "bikram-sambat-js";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { printFarakJanmaMitiData } from "../../../../services/apiServices/sifarish/farakFarakJanmaMiti/farakFarakJanmaMitiService";
import { englishToNepali } from "../../../../utils/utility";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import Image from "next/image";
import { FaPrint } from "react-icons/fa";

export default function PrintFarakJanmaMiti() {
  const aa = new BikramSambat(new Date()).toBS();
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "apiData");
  const { query } = useRouter();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (query?.id) {
      let receiptPrintApi = () => {
        printFarakJanmaMitiData(query?.id).then((response) => {
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
          <div>
            <text className="block text-xl font-bold pt-32 underline">
              विषय : फरक फरक जन्म मिति प्रमाणित।
            </text>
          </div>
          <div className="text-lg font-bold text-red-500">
            मिति : {englishToNepali(aa)}
          </div>
        </div>
        <div>
          <text className=" block">श्री जो जस संग सम्बन्ध छ ।</text>
          <text className=" block pt-4 indent-16 text-justify">
            प्रस्तुत विषयमा जिल्ला ताप्लेजुंग, फक्ताङलुङ गाउँपालिका वडा नं. ४
            स्थायी ठेगाना निवासी gg को निम्न उल्लेखित विवरण अनुसारको कागजातमा
            जन्म मिति फरक हुन गएको हुनाले सो फरक हुन गएको जन्म मिति भएको व्यक्ति
            एकै भएको प्रमाणित गरि पाउन भनी यस कार्यालयमा पेश हुन आएको निवेदन तथा
            सो साथ संलग्न कागजातका आधारमा निजले पेश गरेको व्यहोरा मनासिव भएकोले
            सो फरक जन्म मिति भएको व्यक्ति एकै भएको व्यहोरा सिफारिस गरिन्छ ।
          </text>
        </div>
        <div className=" leading-10 mt-8 divide-y divide-slate-500">
          {apiData?.farakJanmaMitiCorrectionViewModelList?.map(
            (item, index) => {
              return (
                <>
                  <p className=" font-bold">
                    <span className="inline-block text-right">
                      हुनुपर्ने जन्म मिती :
                    </span>
                    {item?.janmaDateToBe}
                  </p>
                  <p className=" font-bold">
                    <span className="inline-block text-right">
                      फरक जन्म मिति र कागजात विवरण :
                    </span>
                    {item?.differentJanmaDate}
                  </p>
                  <p className=" font-bold">
                    <span className="inline-block text-right">
                      नमिलेको कागजात :
                    </span>
                    {item?.differentDoc}
                  </p>
                  <div class="border-t-4 border-indigo-500"></div>
                </>
              );
            }
          )}
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
