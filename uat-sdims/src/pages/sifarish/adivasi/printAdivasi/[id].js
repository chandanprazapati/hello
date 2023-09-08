import Image from "next/image";
import React from "react";
import PlanningHeaderReport from "../../../../components/reusableDesign/PlanningHeaderReport";
import { englishToNepali } from "../../../../utils/utility";
import BikramSambat from "bikram-sambat-js";

export default function PrintAdivasi() {
  const aa = new BikramSambat(new Date()).toBS();
  return (
    <>
      <div
        className=" bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] rounded-xl p-5 w-full h-auto"
        // ref={componentRef}
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
              विषय : आदिवासीको सिफारिस।
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
        </div>
      </div>
    </>
  );
}
