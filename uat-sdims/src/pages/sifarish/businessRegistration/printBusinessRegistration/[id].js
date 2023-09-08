import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import { englishToNepali } from "../../../../utils/utility";
import BikramSambat from "bikram-sambat-js";
import { FaPrint } from "react-icons/fa";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import { businessRegistrationPrint } from "../../../../services/apiServices/sifarish/businessRegistration/businessRegistrationService";

export default function PrintBusinessReg() {
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
        businessRegistrationPrint(query?.id).then((response) => {
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
              विषय : व्यवसाय दर्ताको विवरण पठाइदिने बारे।
            </text>
          </div>
          <div className="text-lg font-bold text-red-500">
            मिति : {englishToNepali(aa)}
          </div>
        </div>
        <div>
          <text className=" block pt-4 text-justify">
            प्रस्तुत विषयमा नगरपालिका कीर्तिपुर को उद्योग, व्यवसाय, दर्ता,
            नविकरण, संचालन र नियमन कार्यविधि २०७५ बमोजिम तहाँ वडा कार्यालयबाट
            हालसम्म के, कति, कुन प्रकारका व्यवसायहरु दर्ता भएका छन् सोको विस्तृत
            विवरण तपशिलको फर्मेटमा तयार पारी पछिसम्म फरक नपर्ने गरी उच्च
            प्राथमिकता दिइ ................ सहित कार्यालयको मेल
            .................. मा पठाइदिनु हुन अनुरोध छ।
          </text>
          <text className=" text-center pt-4 pb-5 block font-bold">तपशिल:</text>
          <div>
            <table class="border-collapse border border-slate-400 w-full">
              <thead>
                <tr>
                  <th class="border border-slate-600">क्र.सं.</th>
                  <th class="border border-slate-600">दर्ता नं.</th>
                  <th class="border border-slate-600">दर्ता मिति</th>
                  <th class="border border-slate-600">व्यवसायको नाम</th>
                  <th class="border border-slate-600">ठेगाना</th>
                  <th class="border border-slate-600">प्रोपाईटर</th>
                  <th class="border border-slate-600">वर्ग</th>
                  <th class="border border-slate-600">सम्पर्क नं.</th>
                  <th class="border border-slate-600">कैफियत</th>
                </tr>
              </thead>
              <tbody>
                {apiData?.bewasayaDartaDetailList?.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td class="border border-slate-600 text-center">
                          {index + 1}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.id}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.nabikaranDate}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.bewasayiName_Np}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.bewasayaPlace_Np}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.dastakhat}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.rasidNumber}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.phoneNumber}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.kaifiyat}
                        </td>
                      </tr>
                    </>
                  );
                })}
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
