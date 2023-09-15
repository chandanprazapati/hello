import BikramSambat from "bikram-sambat-js";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { printGharBatoPramanit } from "../../../../services/apiServices/sifarish/gharBatoPramanit/gharBatoPramanitService";
import { englishToNepali } from "../../../../utils/utility";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import Image from "next/image";
import { FaPrint } from "react-icons/fa";

export default function PrintGharBato() {
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
        printGharBatoPramanit(query?.id).then((response) => {
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
              विषय : घर बाटो प्रमाणित।
            </text>
          </div>
          <div className="text-lg font-bold text-red-500">
            मिति : {englishToNepali(aa)}
          </div>
        </div>
        <div>
          <text className=" block">श्री मालपोत कार्यालय,</text>
          <text className=" block">कलंकी, कीर्तिपुर।</text>
          <text className=" block pt-4 indent-16 text-justify">
            उपरोक्त सम्बन्धमा काठमाडौं जिल्ला, कीर्तिपुर नगरपालिका वडा नं. १
            अन्तर्गत श्री/सुश्री/श्रीमती 32 को नाममा त्यस कार्यालयमा श्रेस्ता
            दर्ता कायम रहेको जग्गाको घरबाटो तपशिलमा उल्लेखित विवरण अनुसार भएको
            व्यहोरा प्रमाणित गरिन्छ ।
          </text>
        </div>
        <div className=" pt-4 leading-8 pl-8">
          <text className=" block underline font-bold">घरबाटोको विवरण :</text>
          <table class="border-collapse border border-slate-400 w-full">
            <thead>
              <tr>
                <th class="border border-slate-300">क्र.स.</th>
                <th class="border border-slate-300">वडा नं.</th>
                <th class="border border-slate-300">सिट नं.</th>
                <th class="border border-slate-300">कि.नं</th>
                <th class="border border-slate-300">क्षेत्रफल</th>
                <th class="border border-slate-300">घर भएको/नभएको</th>
                <th class="border border-slate-300">बाटोको प्रकार</th>
                <th class="border border-slate-300">कैफियत</th>
              </tr>
            </thead>
            <tbody>
              {/* {apiData?.map((item, index) => {
                return (
                  <tr>
                    <td class="border border-slate-300">{apiData.perWard}</td>
                    <td class="border border-slate-300">{apiData.sitNo}</td>
                  </tr>
                );
              })} */}
              <tr>
                <td class="border border-slate-300">{1}</td>
                <td class="border border-slate-300">{apiData.perWard}</td>
                <td class="border border-slate-300">{apiData.sitNo}</td>
                <td class="border border-slate-300">{apiData.kittaNo}</td>
                <td class="border border-slate-300">{apiData.area}</td>
                <td class="border border-slate-300">{apiData.gharKisim}</td>
                <td class="border border-slate-300">{apiData.batoPrakar}</td>
                <td class="border border-slate-300">{apiData.kaifiyat}</td>
              </tr>
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
