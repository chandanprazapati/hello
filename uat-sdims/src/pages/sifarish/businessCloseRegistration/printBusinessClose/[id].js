import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import { englishToNepali } from "../../../../utils/utility";
import { FaPrint } from "react-icons/fa";
import BikramSambat from "bikram-sambat-js";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";
import { businnessClosePrint } from "../../../../services/apiServices/sifarish/businessClose/businessClose";

export default function PrintBusinessCloseId() {
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
        businnessClosePrint(query?.id).then((response) => {
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
          <div className=" pt-32">
            <text className=" text-xl font-bold underline">
              विषय : व्यवसाय बन्द।
            </text>
          </div>
          <div className="text-lg font-bold text-red-500">
            मिति : {englishToNepali(aa)}
          </div>
        </div>
        <div>
          <text className=" block">श्री साना तथा घरेलु उद्योग,</text>
          <text className=" block">उद्योग विकास शाखा, भैरहवा ।</text>
          <text className=" block pt-4 indent-16 text-justify">
            उपरोक्त सम्बन्धमा जिल्ला काठमाडौं कीर्तिपुर नगरपालिका वडा नं. १
            बस्ने 2 ले यस कार्यालयमा आफ्नो नाममा दर्ता कायम रहेको जिल्ला
            काठमाडौं कीर्तिपुर नगरपालिका वडा नं. १ मा रहेको निम्न उल्लेखित
            ब्यवसाय मिति 2023 देखि बन्द भएको भनी निजले यस कार्यालयमा पेश गरेको
            निवेदन उपर {englishToNepali(aa)} को स्थलगत सर्जमिन मुचुल्का तयार गरी
            बुझ्दा निजले पेश गरेको तपसिल बमोजिमको ब्यहोरा मनासिब देखिएको हुँदा
            सोही अनुसारको ब्यहोरा प्रमाणित गरिन्छ ।
          </text>
          <text className=" text-center pt-4 block font-bold">तपसिल</text>
          <div>
            <table class="border-collapse border border-slate-400 w-full">
              <thead>
                <tr>
                  <th class="border border-slate-600">क्र.सं.</th>
                  <th class="border border-slate-600">व्यवसायको प्रकार</th>
                  <th class="border border-slate-600">व्यवसायको प्रकृति</th>
                  <th class="border border-slate-600">वडा नं.</th>
                  <th class="border border-slate-600">दर्ता नं.</th>
                  <th class="border border-slate-600">टोलको नाम</th>
                  <th class="border border-slate-600">बाटोको नाम</th>
                  <th class="border border-slate-600">घर नं.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-slate-600 text-center">1</td>
                  <td class="border border-slate-600 text-center">
                    {apiData?.bewasayaType_Np}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {apiData?.bewasayaPrakriti_Np}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {apiData?.bewasayaWardNo}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {apiData?.bewasayaBandaDartaNo}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {apiData?.bewasayaToleName_Np}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {apiData?.bewasayaBatoName_Np}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {apiData?.bewasayaGharNo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
