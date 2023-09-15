import React, { useEffect, useRef, useState } from "react";
import { englishToNepali } from "../../../../utils/utility";
import BikramSambat from "bikram-sambat-js";
import { date } from "yup";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import Image from "next/image";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import { SadakKhannePrint } from "../../../../services/apiServices/sifarish/sadakKhanee/sadakKhanneService";
import { FaPrint } from "react-icons/fa";

export default function PrintSadakKhanneId() {
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
        SadakKhannePrint(query?.id).then((response) => {
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
            <text className=" text-xl font-bold block pt-20 underline">
              विषय : सडक खन्ने प्रमाणित।
            </text>
          </div>
          <div className="text-lg font-bold text-red-500">
            मिति : {englishToNepali(aa)}
          </div>
        </div>
        <div>
          <text className=" block">श्री काठमाडौ उपत्यका खानेपानी लि.,</text>
          <text className=" block">शाखा कार्यालय, कीर्तिपुर।</text>
          <text className=" block pt-4 indent-16 text-justify">
            तपाईको / त्यस कार्यालयको मिति को निवेदन / पत्र अनुसार निम्न बमोजिम
            स्थानको
            <span className="underline font-bold">{apiData?.roadName}</span>
            सडक खन्ने अनुमति दिइएको छ। लेखिए बमोजिमको शर्तहरु पालना गरि यो पत्र
            प्राप्त भएको मितिले 4 दिन भित्र कार्य सम्पन्न गर्नुहोला।
          </text>
        </div>
        <div className=" pt-4 leading-8 pl-8">
          <p className=" font-bold">
            <span className="inline-block text-right">
              खन्न स्विकृति प्रदान गरेको सडक :
            </span>
            {apiData?.roadName}
          </p>
          <p className=" font-bold">
            <span className="inline-block text-right">
              सडक खन्न स्विकृति प्रदान गरेको ईकाइ :
            </span>
            {apiData?.depth}वर्ग मिटर
          </p>
          <p className=" font-bold">
            <span className="inline-block text-right">
              सडक खन्न स्विकृति प्रदान धरौटी रकम रु. :
            </span>
            {apiData?.depositAmount}
          </p>
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
