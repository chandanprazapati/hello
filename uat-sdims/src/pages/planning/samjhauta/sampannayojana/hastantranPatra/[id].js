import React, { useRef } from "react";
import ViewPage from "../../../../../components/viewPage/ViewPage";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { AiOutlineDownload } from "react-icons/ai";
import Image from "next/image";
const Report = () => {
  const router = useRouter();
  const userId = router.query.id;
  const aa = new BikramSambat(new Date()).toBS();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div className="flex-col pt-4 bg-[#F0F1F5] px-3 ">
        <div
          className="flex flex-col xl:flex-row my-10 gap-8"
          ref={componentRef}
        >
          <div className="bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] rounded-xl p-5 w-full ">
            <div className="flex justify-between pb-10  ">
              <div>
                <Image
                  src="https://res.cloudinary.com/dg1opyudu/image/upload/v1678796501/SDIMS/Emblem_of_Nepal_c3mw8w.png"
                  height={120}
                  width={120}
                  alt="nagarpalika logo"
                  priority
                />
              </div>
              <div>
                <div className="text-2xl font-extrabold">फिदिम नगरपालिका</div>
                <div className="text-xl font-bold text-center ">
                  Fidim Municipality
                </div>
                <div className="text-center">नगरकार्यपालिकाको कार्यालय</div>
                <div className="text-center">फिदिम</div>
                <div className="text-center">कोशी प्रदेश</div>
              </div>
              <div className="text-xl font-bold pt-20">मिति : {aa}</div>
            </div>

            <div className="font-bold leading-8 ">
              <div>चलानी नम्बर :</div>
            </div>

            <div className="text-2xl font-bold flex justify-center">
              विषय: सम्झोेता सम्बन्धमा ।
            </div>
            <div className="py-10 px-10 ">
              <text className="font-bold">श्रीमान्</text> <br />
              <tetx className="text-xs">फिदिम-1</tetx> <br />
              <text className="text-center tracking-normal leading-loose ">
                उपरोक्त विषयमा बाग्लुंग नगरपालिका को आ.व २०७९/०८० स्वीक्रित
                वजेट, नीति तथा कार्यक्रम मिति ५/२५/२०२३ को गा.पा.को बैठक
                निर्णयानुसार यस कार्यालयको प्राविधिक को प्रतयक्ष निर्देशनमा रही
                मिति ......... भित्र सम्पन्न भयो । उक्त कार्यक्रमको लागि .......
                रकम खर्च/प्रयोग भएको जानकारी गराइन्छ|
              </text>
            </div>
          </div>

          <br />
        </div>

        <div className="flex justify-end">
          <button
            className="flex justify-end items-center bg-white rounded-xl p-3 gap-2"
            onClick={handlePrint}
          >
            <AiOutlineDownload size={20} />
            Download
          </button>
        </div>
        <br />
      </div>
    </>
  );
};

export default Report;
