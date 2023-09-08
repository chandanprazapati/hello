import Image from "next/image";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { englishToNepali } from "../../../../utils/utility";

export default function NivedanPatraDhacha() {
  const aa = new BikramSambat(new Date()).toBS();
  const inNepali = englishToNepali(aa);
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
                <div className="text-2xl font-extrabold text-center">
                  श्री फिदिम गाउँपालिका,कानूनी मामिला प्रणाली न्यायिक समिती
                  समक्ष पेश गरेको
                </div>
                <div className="text-xl font-bold text-center ">
                  निवेदन -पत्र
                </div>
                <div className="text-center font-bold ">
                  (दफा २१ को उपदफा (२) सँग सम्बन्धित)
                </div>
                <div className="text-center font-bold">उजुरीको ढाँचा</div>
              </div>
              <div className="text-xl font-bold pt-20">मिति : {inNepali}</div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
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
