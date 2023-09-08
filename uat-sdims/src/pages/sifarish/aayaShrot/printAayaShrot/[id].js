import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import { englishToNepali } from "../../../../utils/utility";
import BikramSambat from "bikram-sambat-js";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { AayaShrotPrint } from "../../../../services/apiServices/sifarish/aayaShrot/aayaShrotService";
import { useRouter } from "next/router";

export default function PrintAayashrot() {
  const aa = new BikramSambat(new Date()).toBS();
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { query } = useRouter();

  useEffect(() => {
    if (query?.id) {
      let receiptPrintApi = () => {
        AayaShrotPrint(query?.id).then((response) => {
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
            <text className="block text-xl font-bold pt-20">
              विषय : आय श्रोत प्रमाणित सम्बन्धमा।
            </text>
          </div>
          <div className="text-lg font-bold text-red-500">
            मिति : {englishToNepali(aa)}
          </div>
        </div>
        <div>
          <text className=" block">श्री जो जससँग सम्बन्ध छ।</text>
          <text className=" block pt-4 indent-16 text-justify">
            उपरोक्त सम्बन्धमा यस कीर्तिपुर नगरपालिका वडा नं ० निवासी निवेदक श्री
            / सुश्री / श्रीमती कृष्ण ले दिनु भएको निवेदन अनुसार निज निवेदकको आय
            श्रोत तपशिल बमोजिम रहेको व्यहोरा सिफारिस साथ सादर अनुरोध गर्दछु।
          </text>
          <text className=" text-center pt-4 block font-bold">तपशिल:</text>
          <div>
            <table class="border-collapse border border-slate-400 w-full">
              <thead>
                <tr>
                  <th class="border border-slate-600">क्र.सं.</th>
                  <th class="border border-slate-600">विवरण</th>
                  <th class="border border-slate-600">वार्षिक आय श्रोत</th>
                </tr>
              </thead>
              <tbody>
                {apiData?.aayaShrotDetailModelList?.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td class="border border-slate-600 text-center">
                          {index + 1}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.vivaran}
                        </td>
                        <td class="border border-slate-600 text-center">
                          {item?.annualIncome}
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
