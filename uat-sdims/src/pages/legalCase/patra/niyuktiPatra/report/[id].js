import Image from "next/image";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { englishToNepali } from "../../../../../utils/utility";
import SeoOptimization from "../../../../../components/reusableDesign/SeoOptimzation";

export default function NIyuktiReport() {
  const aa = new BikramSambat(new Date()).toBS();
  const inNepali = englishToNepali(aa);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <SeoOptimization title={"नियुक्ति पत्र रिपोर्ट "} />
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
                <div className="text-2xl font-extrabold text-center">
                  फिदिम नगरपालिका,कानूनी मामिला प्रणाली
                </div>
                <div className="text-xl font-bold text-center ">
                  नगरपालिकाको कार्यालय
                </div>
                <div className="text-center font-bold ">हात्तिमुडा, मोरङ</div>
                <div className="text-center font-bold">१ नं प्रदेश नेपाल</div>
              </div>
              <div className="text-xl font-bold pt-20">मिति : {inNepali}</div>
            </div>

            <div className="flex flex-col gap-4">
              <text> प.सं. : </text>
              <text>च.नं. :</text>
            </div>

            <text className=" text-xl font-bold flex justify-center ">
              विषय:- नियुक्ति गरिएको बारे
            </text>

            <div className="flex flex-col gap-4  p-4">
              <text>श्री </text>
              <text>श्री</text>
              <text>श्री</text>
            </div>

            <text>फिदिम नगरपालिका वार्ड १</text>
            <br />
            <br />

            <text>
              यस बुढिगंगा गाँउपालिका न्यायिक समिति अन्तरगत सञ्चालित वार्ड १ को
              मेलमिला केन्द्रमा यस आ.ब. को लागी तपाइलाई मेलमिलापकर्ताको रुपमा
              कामकाज गर्नको लागी नियुक्ति गरिएको छ ।
            </text>
            <br />
            <br />
            <br />
            <text className="flex justify-end">सजीब न्यौपाने</text>
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
}
