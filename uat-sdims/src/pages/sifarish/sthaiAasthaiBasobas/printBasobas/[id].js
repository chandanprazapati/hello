import React, { useEffect, useRef, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import Image from "next/image";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import { englishToNepali } from "../../../../utils/utility";
import BikramSambat from "bikram-sambat-js";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import {
  getBasobasFile,
  printBasobas,
} from "../../../../services/apiServices/sifarish/sthaiAsthaiBasobas/sthaiAsthaiBasobasService";
import { FaPrint } from "react-icons/fa";

export default function PrintBasobas() {
  const aa = new BikramSambat(new Date()).toBS();
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "printData");
  const { query } = useRouter();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (query?.id) {
      let receiptPrintApi = () => {
        printBasobas(query?.id).then((response) => {
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
          <div className=" pt-10">
            <text className=" text-xl font-bold block pt-20">
              विषय : स्थाई बसोबासको सिफारिस।
            </text>
          </div>
          <div className="text-lg font-bold text-red-500">
            मिति : {englishToNepali(aa)}
          </div>
        </div>
        <div>
          <text className=" block">श्री जो जस संग सम्बन्ध छ ।</text>
          <text className=" block pt-4 indent-16 text-justify">
            प्रस्तुत विषयमा जिल्ला काठमाडौं कीर्तिपुर नगरपालिका वडा नं. १ स्थायी
            घर भई हाल कीर्तिपुर नगरपालिका वडा नं. १ बस्ने fff ले यस कार्यालयमा
            पेश गर्नुभएको निवेदन उपर बुझ्दा निज fff आफ्नो परिवार सहित जिल्ला
            सिरीजङ्घा गाउँपालिका वडा नं. १० मा मिति २०७९-१०-०४ देखि तपसिल
            बमोजिमका परिवार सहित स्थाई बसोबास गदै बुझिएकोले साही अनुसारको
            ब्यहोरा प्रमाणित गरिन्छ ।
          </text>
        </div>
        <div className=" pt-5">
          <text className="text-center block text-xl font-bold pb-6">
            तपसिल :
          </text>
          <table class="border-collapse border border-slate-400 w-full pb-20">
            <thead>
              <tr>
                <th class="border border-slate-600">क्र. स. </th>
                <th class="border border-slate-600">नाम थर </th>
                <th class="border border-slate-600">नाता </th>
                <th class="border border-slate-600">कैफियत </th>
              </tr>
            </thead>
            <tbody>
              {apiData?.basobasFamilyList?.map((items, index) => {
                return (
                  <tr>
                    <td class="border border-slate-600 text-center">
                      {index + 1}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.naamThar}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.relationName}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className=" pt-8">
          <text className="text-center block text-xl font-bold pb-3">
            बसोबास स्थान :
          </text>
          <table class="border-collapse border border-slate-400 w-full pb-20">
            <thead>
              <tr>
                <th class="border border-slate-600">क्र. स. </th>
                <th class="border border-slate-600">टोल </th>
                <th class="border border-slate-600">बाटोको नाम </th>
                <th class="border border-slate-600">घर नं. </th>
              </tr>
            </thead>
            <tbody>
              {apiData?.basobasGharDetailModelList?.map((items, index) => {
                return (
                  <tr>
                    <td class="border border-slate-600 text-center">
                      {index + 1}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.tole}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.bato}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.gharNo}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
