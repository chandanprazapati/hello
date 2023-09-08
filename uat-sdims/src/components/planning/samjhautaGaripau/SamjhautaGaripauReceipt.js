import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import { useRouter } from "next/router";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import { getSamjhautaGaripauReport } from "../../../services/apiServices/planning/report/reportService";
import { englishToNepali } from "../../../utils/utility";
const SamjhautaGaripauReceipt = () => {
  const aa = new BikramSambat(new Date()).toBS();
  const router = useRouter();
  const userId = router?.query?.id;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    let samjhautaGaripauApiData = () => {
      if (userId) {
        getSamjhautaGaripauReport(userId).then((response) => {
          try {
            response.status === true;
            {
              setApiData(response.data);
            }
          } catch (error) {
            toast.error(response.message, {
              autoClose: 1000,
            });
          }
        });
      }
    };
    samjhautaGaripauApiData();
  }, [setApiData, userId]);

  return (
    <>
      <div className="flex-col  bg-[#F0F1F5] px-3 ">
        <div
          className="flex flex-col xl:flex-row my-10 gap-8"
          ref={componentRef}
        >
          <div className="bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] rounded-xl p-5 w-full ">
            <div className="flex justify-end pb-10  ">
            
            
              <div className="text-xl font-bold pt-20">मिति : {englishToNepali(aa)}</div>
            </div>

            <div className="leading-loose">
              <div>श्रीमान प्रमुख प्रशासकीय अधिकृत ज्यु</div>
              <div>बाग्लुंग नगरपालिका,नगरकार्यपालिकाको कार्यालय</div>
              <div>बाग्लुंग</div>
            </div>

            <div className="text-2xl font-bold flex justify-center">
              विषय: योजना सम्झौता गरिपाऊँ ।
            </div>
            <div className="py-10 px-10 ">
              <div className="text-justify tracking-normal leading-loose ">
                उपरोक्त सम्बन्धमा गण्डकी गाउपालिका अन्तर्गत आ ब
                {apiData.fiscalYearName ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData.fiscalYearName}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                मा वडा नं.
                {apiData.wardId ? (
                  <span className="font-bold px-1 "> {englishToNepali(apiData?.wardId)} </span>
                ) : (
                  "......................."
                )}{" "}
                मा संचालन हुने
                {apiData.yojanaName ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {apiData.yojanaName}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                योजनाको लागि विनियोजीत रकम रु
                {apiData.estimatedAmount ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {englishToNepali(apiData?.estimatedAmount)} /-
                  </span>
                ) : (
                  "......................."
                )}{" "}
                {/* अक्ष्ररुपी दस लाख रुपैंया शुन्य
                पैसा मात्र । */}
                बाट लागत इस्टिमेट बमोजिमको काम सम्पन्न गर्नको लागि मिति
                {apiData.samiti?.nepaliSamitiEstdDate ? (
                  <span className="font-bold px-1 ">
                    {" "}
                    {englishToNepali(apiData.samiti?.nepaliSamitiEstdDate)}{" "}
                  </span>
                ) : (
                  "......................."
                )}{" "}
                {/* अक्ष्ररुपी दस लाख रुपैंया शुन्य
                पैसा मात्र । */}
                को भेलाबाट गठित उपभोक्ता समितिको अध्यक्ष् र सचिवको नाममा योजना
                सम्झौता गरिदिनुहुन निम्न कागजातहरु समेत संलगन राखि निवेदन पेश
                गरेका छौ |
              </div>
            </div>

            <div className=" px-0 lg:px-10 flex justify-around">
              <div>
                <div>-----------------------------</div>
                <div className="flex justify-center font-bold">सचिव</div>
                <div className="flex justify-center font-bold">नाम,थर</div>
              </div>

              <div>
                <div>-----------------------------</div>
                <div className="flex justify-center  font-bold">अध्यक्ष</div>
                <div className="flex justify-center  font-bold">नाम,थर</div>
              </div>
            </div>
            <div className="pt-20 pl-20 text-2xl pb-6 font-bold">
              संलग्न कागजातहरु :
            </div>
            <div className="pl-20 flex flex-col gap-4">
              <text>
                {" "}
                (क) उपभोक्त्ता समिति गठन गर्ने आम भेलामा निर्णयको प्रतिलिपी
              </text>

              <text>
                {" "}
                (ख) उपभोक्ता समितिका अध्यक्ष् /कोषाध्यक्ष् /सचिवको नागरिक्ताको
                प्रतिलिपि
              </text>

              <text> (ग) आयोजानाको लागत अनुमान विवरण </text>

              <text>
                {" "}
                (घ) उपभोक्ता समितिबाट सम्झौताको लागि जिम्मेवारपदाधिकारी तोकिएको
                उपभोक्ता समितिको निर्णय{" "}
              </text>
              <text> (ङ) आयोजनाको कार्यान्वयनको कार्य तालिका </text>
              <text>
                {" "}
                (च) खाता संचलान गर्ने पदाधिकारी तोकोएको निर्णय र खाता संचालान्को
                लागि आवश्यक कागजातहरु{" "}
              </text>
              <text> (छ) वडा कार्यालयको सिफारीस पत्र </text>
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
      </div>
    </>
  );
};

export default SamjhautaGaripauReceipt;
