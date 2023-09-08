import React, { useEffect, useRef, useState } from "react";
import { englishToNepali } from "../../../../utils/utility";
import BikramSambat from "bikram-sambat-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAnnualIncomePrint } from "../../../../services/apiServices/sifarish/annualIncome/annualIncomeService";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import { AiOutlineDownload } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";

export default function Index() {
  const aa = new BikramSambat(new Date()).toBS();
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log(apiData, "apiData");
  const { query } = useRouter();
  console.log(query.id, "hello");

  useEffect(() => {
    if (query?.id) {
      let receiptPrintApi = () => {
        getAnnualIncomePrint(query?.id).then((response) => {
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
    <div>
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
              विषय : सिफारिस सम्बन्धमा।
            </text>
          </div>
          <div className="text-lg font-bold">मिति : {englishToNepali(aa)}</div>
        </div>
        <div>
          <text className=" block">श्री जो जससँग सम्बन्ध छ।</text>
          <text className=" block pt-4 indent-16 text-justify">
            उपरोक्त सम्बन्धमा यस की.न.पा. वडा नं ० निवासी निवेदक श्री / सुश्री /
            श्रीमती ram को वार्षिक आम्दानी प्रमाणित गरि पाउन भनी यस कार्यालयमा
            पेश हुन आएको निवेदन तथा सोसाथ संलग्न कागजातका आधारमा निजले पेश गरेको
            व्यहोरा मनासिव भएकोले निजले निम्न स्रोतहरूबाट आम्दानी गरेको व्यहोरा
            सिफारिस गरिन्छ।
          </text>
          <text className=" text-center pt-4 block font-bold">
            वार्षिक आय विवरण:
          </text>
          <div>
            <table class="border-collapse border border-slate-400 w-full">
              <thead>
                <tr>
                  <th class="border border-slate-600">क्र.सं.</th>
                  <th class="border border-slate-600">आम्दानीको श्रोत</th>
                  <th class="border border-slate-600">वार्षिक आम्दानी (रु.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-slate-600">1</td>
                  <td class="border border-slate-600">व्यपारको आम्दानी</td>
                  <td class="border border-slate-600">
                    {apiData?.annualIncomeDetail?.businessIncome}
                  </td>
                </tr>
                <tr>
                  <td class="border border-slate-600">2</td>
                  <td class="border border-slate-600">भाडाको आम्दानी</td>
                  <td class="border border-slate-600">
                    {apiData?.annualIncomeDetail?.rentIncome}
                  </td>
                </tr>
                <tr>
                  <td class="border border-slate-600">3</td>
                  <td class="border border-slate-600">तलब आम्दानी</td>
                  <td class="border border-slate-600">
                    {apiData?.annualIncomeDetail?.salaryIncome}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className=" pt-4 leading-8">
          <text className=" block">
            आम्दानीको स्रोतको कुल मूल्याङ्कन १०००० हो। जुन ........... डलर बराबर
            छ
          </text>
          <text className=" block">नोट: आजको विनिमय दर $१ = रु. ......</text>
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
    </div>
  );
}
