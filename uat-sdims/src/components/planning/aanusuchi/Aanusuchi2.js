import React, { useRef, useState } from "react";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import {
  
  planningSamjhautaById,
} from "../../../services/apiServices/planning/planningSamjhauta/planningSamjhautaService";

const Aanusuchi2 = () => {
  const aa = new BikramSambat(new Date()).toBS();
  const router = useRouter();
  const userId = router?.query?.id;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    if (userId) {
      let samjhautaApiData = () => {
        planningSamjhautaById(userId).then((response) => {
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
      };
      samjhautaApiData();
    }
  }, [setApiData, userId]);
  return (
    <>
      <div className=" border-2 py-2 bg-[#1b71aafd] flex justify-center">
        <text className="border-2 p-3 border-[#1b71aafd] bg-white font-bold text-lg ">
          अनुसूची २ / योजना सम्झौता फारम
        </text>
      </div>

      <div className="flex-col pt-4 bg-[url('https://res.cloudinary.com/dg1opyudu/image/upload/v1684819916/1_ga21iq.jpg')] px-3 ">
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

            <div className="font-bold flex gap-2 flex-col ">
              <div>पत्र संख्या : </div>
              <div>चलानी नम्बर : </div>
            </div>

            <div className="text-2xl font-bold flex justify-center">
              विषय: योजना सम्झौता ।
            </div>
            <div className="pt-10 px-10 font-bold pb-4 ">
              तपसिल बाग्लुंग नगरपालिका कार्यालय र उपभोक्ता समिति बीचको सम्झौता
            </div>
            <div className="px-10 flex flex-col gap-2 ">
              <text>
                आर्थिक वर्ष :{" "}
                <span className="font-semibold">{apiData?.fiscalYearName} </span>{" "}
              </text>
              <text>
                वजेट श्रोत :{" "}
                <span className="font-semibold">
                  {apiData.budgetSourceName}{" "}
                </span>{" "}
              </text>
              <text>
                वडा नं.:{" "}
                <span className="font-semibold">{apiData.wardId} </span>{" "}
              </text>
              {/* <text>कार्यक्षेत्र : <span className="font-semibold" >{apiData.fiscalYearName} </span> </text> */}
            </div>

            <div className="flex justify-center pt-4 font-bold text-lg">
              सम्झौता गर्ने संस्थाको नाम :{" "}
              <span className="font-semibold">
                {apiData.samjhauta_Org_Name}{" "}
              </span>
            </div>
            <div className="px-10 font-bold pt-4 ">
              १. सम्झौता गर्ने पक्ष र आयोजनाः
            </div>
            <div className=" pl-16 pt-4 flex flex-col gap-2 ">
              <text className="font-bold">
                (क) उपभोक्ता समिति /समुदायमा आधारीत संस्था /गैर सरकारी संस्थाको
                विवरण : सम्झौता गर्ने संस्थाको प्रतिनिधीको नाम र पद,
              </text>
              <text>
                १. नाम :{" "}
                <span className="font-semibold">
                  {apiData.representativeName}{" "}
                </span>{" "}
              </text>
              <text>
                २. पद :{" "}
                <span className="font-semibold">
                  {apiData.representativeDesignition}{" "}
                </span>{" "}
              </text>
              <text>
                ३. ठेगाना :{" "}
                <span className="font-semibold">
                  {apiData.representativeAddress}{" "}
                </span>
              </text>
              <text className="font-bold">(ख) आयोजनाको विवरणः</text>
              <text>
                १. नाम :{" "}
                <span className="font-semibold">{apiData.project_Name} </span>
              </text>
              <text>
                २. स्थान :{" "}
                <span className="font-semibold">{apiData.project_Place} </span>{" "}
              </text>
              <text>
                ३. उदेश्य : :{" "}
                <span className="font-semibold">
                  {apiData.project_Objective}{" "}
                </span>
              </text>
              <text>
                ४. आयोजना स्वीकृत गर्ने निकाय :{" "}
                <span className="font-semibold">
                  {apiData.project_Acceptance_By}{" "}
                </span>
              </text>
              <text>
                ५.आयोजना शुरु हुने मिति :{" "}
                <span className="font-semibold">
                  {apiData.project_Start_Date}{" "}
                </span>
              </text>
              <text>
                ६. आयोजना समाप्त हुने मिति :{" "}
                <span className="font-semibold">
                  {apiData.project_End_Date}{" "}
                </span>
              </text>
              <text className="font-bold">
                (क) लागत अनुमान रु :{" "}
                <span className="font-semibold">
                  {apiData.project_estimated_Amount}{" "}
                </span>{" "}
                /-{" "}
              </text>
              <text className="font-bold">(ख) लागत व्यहोर्ने श्रोतहरु </text>
              <text>
                १. नेपाल सरकार रु.{" "}
                <span className="font-semibold">
                  {apiData.nepal_Government}{" "}
                </span>{" "}
                /-{" "}
              </text>
              <text>
                २. प्रदेश सरकार रु.{" "}
                <span className="font-semibold">{apiData.state} </span> /-{" "}
              </text>
              <text>
                ३. स्थानियतह वाट रु.{" "}
                <span className="font-semibold">{apiData.municipality} </span>{" "}
                /-{" "}
              </text>
              <text>
                ४. गैर सरकारी संघ संस्थाबाट रु.{" "}
                <span className="font-semibold">{apiData.ngO_INGO} </span> /-{" "}
              </text>
              <text>
                ५. समुदायमा आधारित संस्थाबाट रु.{" "}
                <span className="font-semibold">{apiData.community_Org} </span>{" "}
                /-{" "}
              </text>
              <text>
                ६. विदेशी दातृ संघ संस्थाबाट रु.{" "}
                <span className="font-semibold">{apiData.foreign_Org} </span> /-{" "}
              </text>
              <text>
                ७. उपभोक्ता समितिवाट नगद रु.{" "}
                <span className="font-semibold">
                  {apiData.public_Community}{" "}
                </span>{" "}
                /-{" "}
              </text>
              <text>
                {" "}
                ८. श्रमदान रु.{" "}
                <span className="font-semibold">
                  {apiData.loan_Grant}{" "}
                </span> /-{" "}
              </text>
              <text>
                ९. अन्य रु.{" "}
                <span className="font-semibold">{apiData.other_Source} </span>{" "}
                /-{" "}
              </text>
              {/* <text>१०. जम्मा रु. <span className="font-semibold" >{apiData.fiscalYearName} </span> /- </text> */}
            </div>
            <div className="px-10 font-bold pt-4 ">
              २. आयोजनावाट लाभान्वित हुने (प्रतिशतमा):
            </div>
            <div className=" pl-16 pt-4 flex flex-col gap-2 ">
              <text>
                १. घर संख्या :{" "}
                <span className="font-semibold">{apiData?.total_House} </span>{" "}
              </text>
              <text>
                २. महिला जनसंख्या :{" "}
                <span className="font-semibold">{apiData?.total_Female} </span>{" "}
              </text>
              <text>
                ३. पुरुष जनसंख्या :{" "}
                <span className="font-semibold">{apiData?.total_Male} </span>{" "}
              </text>
              <text>
                ४. समुदायः संख्या :{" "}
                <span className="font-semibold">{apiData.community} </span>{" "}
              </text>
              <text>
                ५. अन्य :{" "}
                <span className="font-semibold">{apiData.other} </span>{" "}
              </text>
            </div>

            <div className="px-10 font-bold pt-4 ">
              ३. उपभोक्ता समिति /गैर सरकारी संस्था /समुदायमा आधारीत संस्था
              सम्बन्धि विवरण :
            </div>
            <div className=" pl-16 pt-4 flex flex-col gap-2 ">
              <text className="font-bold">
                (क) समिति गठन भएको मिति :{" "}
                <span className="font-semibold">{apiData.fiscalYearName} </span>{" "}
              </text>
              <text className="font-bold">
                (ख) पदाधिकारीको नाम र ठेगाना :{" "}
                <span className="font-semibold">{apiData.fiscalYearName} </span>{" "}
              </text>
              <text>
                १. अध्यक्ष :{" "}
                <span className="font-semibold">{apiData.fiscalYearName} </span>{" "}
              </text>
              <text>
                २. सचिव :{" "}
                <span className="font-semibold">{apiData.fiscalYearName} </span>{" "}
              </text>
              <text>
                ३. कोषाध्यक्ष :{" "}
                <span className="font-semibold">{apiData.fiscalYearName} </span>{" "}
              </text>
              <text>
                ४. सदस्य :{" "}
                <span className="font-semibold">{apiData.fiscalYearName} </span>{" "}
              </text>
              <text className="font-bold">
                (ग) समिति गठन गर्दा उपस्थित लाभान्वितको संख्याः  <span className="font-semibold">{apiData?.samitiView?.beneficiaries_Attendance} </span>{" "}
              </text>
              <text className="font-bold">
                (घ) समिति गठन गर्दा अनुपस्थित लाभान्वितको संख्याः <span className="font-semibold">{apiData?.samitiView?.beneficiaries_Absent} </span>{" "}
              </text>
            </div>
            <div className="px-10 font-bold pt-4 ">
              ४. आयोजना सञ्चालन सम्वन्धित अनुभवः
            </div>
            <div className="px-10 font-bold pt-4 ">
              ५. उपभोक्ता समिति समिदायमा आधारित संस्था गैर सरकारी संस्थाले
              प्राप्त गर्ने किस्ता विवरणः
            </div>
            <div className=" pl-16 pt-4 flex flex-col gap-2 ">
              <text>कन्टिजेनसी वापत कट्टिहुने रकम ५ % : रु. <span className="font-semibold">{apiData.contegency_Amount} </span> /- {" "} </text>
              <text>मर्मत सम्भार कोष वापत कट्टिहुने रकम ५ % : <span className="font-semibold">{apiData.marmatSambhar_Amount} </span> /-{" "} </text>
            </div>

            <div className="pl-10 pt-4 ">
              <table className="border border-slate-600 w-full  ">
                <thead>
                  <tr>
                    <th className="border border-slate-600  ">किस्ता क्रम </th>
                    <th className="border border-slate-600  ">मिति</th>
                    <th className="border border-slate-600  ">किस्ता रकम</th>
                    <th className="border border-slate-600  ">
                      {" "}
                      निर्माण सामाग्री{" "}
                    </th>
                    <th className="border border-slate-600  ">कैफियत</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td className="border border-slate-600  ">पहिलो</td>
                    <td className="border border-slate-600  ">
                      {apiData?.planningSamjhautaKistaFirstDetailsList?.payment_Date?.substring(
                        0,
                        10
                      )}
                    </td>
                    <td className="border border-slate-600  ">
                      {
                        apiData?.planningSamjhautaKistaFirstDetailsList
                          ?.kista_Kram
                      }
                    </td>
                    <td className="border border-slate-600  ">
                      {
                        apiData?.planningSamjhautaKistaFirstDetailsList
                          ?.nirmarn_Samagri
                      }
                    </td>
                    <td className="border border-slate-600  ">
                      {apiData?.planningSamjhautaKistaFirstDetailsList?.remarks}
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-slate-600  ">दोश्राे</td>
                    <td className="border border-slate-600  ">
                      {apiData?.planningSamjhautaKistaSecondDetailsList?.payment_Date?.substring(
                        0,
                        10
                      )}
                    </td>
                    <td className="border border-slate-600  ">
                      {
                        apiData?.planningSamjhautaKistaSecondDetailsList
                          ?.kista_Kram
                      }
                    </td>
                    <td className="border border-slate-600  ">
                      {
                        apiData?.planningSamjhautaKistaSecondDetailsList
                          ?.nirmarn_Samagri
                      }
                    </td>
                    <td className="border border-slate-600  ">
                      {
                        apiData?.planningSamjhautaKistaSecondDetailsList
                          ?.remarks
                      }
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-slate-600  ">तेश्रो</td>
                    <td className="border border-slate-600  ">
                      {apiData?.planningSamjhautaKistaThirdDetailsList?.payment_Date?.substring(
                        0,
                        10
                      )}
                    </td>
                    <td className="border border-slate-600  ">
                      {
                        apiData?.planningSamjhautaKistaThirdDetailsList
                          ?.kista_Kram
                      }
                    </td>
                    <td className="border border-slate-600  ">
                      {
                        apiData?.planningSamjhautaKistaThirdDetailsList
                          ?.nirmarn_Samagri
                      }
                    </td>
                    <td className="border border-slate-600  ">
                      {apiData?.planningSamjhautaKistaThirdDetailsList?.remarks}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-10 font-bold pt-4 ">
              ६.आयोजनाबाट हुने भौतिक लक्ष्य
            </div>

            <div className="pl-10 pt-4 ">
              <table className="border border-slate-600 w-full  ">
                <thead>
                  <tr>
                    <th className="border border-slate-600  ">सि.न </th>
                    <th className="border border-slate-600  ">उप-क्षत्र </th>
                    <th className="border border-slate-600  ">विवरण</th>
                    <th className="border border-slate-600  ">कैफियत</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td className="border border-slate-600  "> १ </td>
                    <td className="border border-slate-600  "> {apiData?.upaChetraName} </td>
                    <td className="border border-slate-600  ">{apiData?.upaChetraDetailName}</td>

                    
                  </tr>

                  
                </tbody>
              </table>
            </div>
            <div className="flex justify-center pt-6 font-bold text-lg">
              सम्झौताका शर्तहरुः
            </div>
            <div className="px-10 font-bold pt-4 ">
              उपभोक्ता समितिको जिम्मेवारी तथा पालना गरिने शर्तहरु :
            </div>
            <div className=" pl-16 pt-4 flex flex-col gap-2 text-sm  leading-relaxed tracking-normal ">
              <text>
                १. योजना सम्झौता भए पश्चात सर्वप्रथम योजना स्थलमा तोकिए बमोजिमको
                सूचना पाटी राखेर मात्रै कार्य प्रारम्भ गर्नुपर्नेछ ।
              </text>
              <text>
                २. उपभोक्ता समितिबाट हुने प्रत्येक भुक्तानी उपभोक्ता समितिको
                निर्णय पश्चात मात्रै खाता सञ्चालक सदस्यहरुले भुक्तानी पाउने
                सम्बन्धित पक्षको नाममा चेकबाट/ बैंक खाता मार्फत भुक्तानी
                गर्नुपर्नेछ । उपभोक्ता समितिका कुनै पनि सदस्यको नाममा रकम निकासा
                गर्न सकिने छैन ।
              </text>
              <text>
                ३. सबै कार्य नेपाल सरकार तथा प्रदेश सरकारको सम्बन्धित कानून,
                गाउँपालिकाको कानून तथा गाउँपालिकाको निर्देशनको अधिनमा रही
                उपभोक्ता समितिको निर्णयबाट हुनेछ ।
              </text>
              <text>
                ४. अनुगमन समितिले तोकिए बमोजिम नियमित अनुगमन गरी तोकिए बमोजिम
                नियमित प्रतिवेदन समेत गर्नुपर्नेछ।
              </text>
              <text>
                ५. स्वीकृत लागत अनुमान बमोजिम नै कार्यसम्पादन गर्नुपर्नेछ । कुनै
                परिवर्तन गर्नुपरेमा समयमा नै वडा समितिको सिफारिस सहित
                गाउँपालिकामा निवेदन दिई स्वीकृत गराउनु पर्नेछ । अन्यथा
                कार्यसम्पादन भएकोमा गाउँपालिका भुक्तानी दिन बाध्य हुने छैन । सो
                कार्यको जवाफदेहिता उपभोक्ता समिति स्वयंमा रहनेछ ।
              </text>
              <text>
                ६. रसम्पादित कार्य गुणस्तरीय नभएमा उपभोक्ता समितिलाई भुक्तानी
                दिन गाउँपालिका बाध्य हुने छैन ।
              </text>
              <text>
                ७. कार्यसम्पादन भएपछि तोकिएको प्राविधिकद्वारा पछिसम्म फरक नपर्ने
                गरी स्थानीय दररेट अनुसार विलिङ गर्नुपर्नेछ र सो विललाई सपोर्ट
                गर्ने बिल भरपाई समेत पेश गर्नुपर्नेछ ।
              </text>
              <text>
                ८. उपभोक्ता समितिबाट पेश भएका कागजातहरु गलत भएमा सो को सम्पुर्ण
                जिम्मेवारी सम्बन्धित समितिको नै हुनेछ ।
              </text>
              <text>
                {`९. रु २०,००० भन्दा बढी रकमको विल पेश गर्दा अनिवार्य रुपमा भ्याट
                बिल पेश गर्नु पर्नेछ ।`}
              </text>
              <text>
                {`१०. रु ३,००,०००/- वा सो भन्दा बढीका योजनाको योजना संचालन हुने
                स्थानमा सबैले देख्ने गरी तोकिए बमोजिमको विवरण सबैले देखने गरी
                सार्वजनिक गर्नुपर्नेछ ।`}
              </text>
              <text>
                ११. योजना संचालन हुँदै जाँदा कार्यसम्पन्न भएको आधारमा
                गाउँपालिकाकाले रकम बढीमा ३ किस्तामा भुक्तानी दिनेछ । प्रत्येक
                किस्ताको रकम खर्च भएपछि सो अनुसार काम भएको भन्ने उपभोक्ता भेला,
                अनुगमन समिति, प्राविधिक निरिक्षण, वडा समिति तथा अनुगमन मूल्यांकन
                कर्ताको सिफारिस समेत प्राप्त भएपछि अर्को किस्ता भुक्तानी दिइनेछ
                । सार्वजनिक परीक्षण पश्चात मात्रै अन्तिम किस्ता भुक्तानी दिइनेछ
                ।
              </text>
              <text>
                १२. उपलब्ध भएसम्म अनिवार्य रुपमा गाउपालिकाको स्वामित्वमा रहेका
                मेशीनरी तथा औजारको उपयोग गरी आयोजना संचालन गर्नुपर्नेछ ।
              </text>
              <text>
                १३. कुनै विषयमा अस्पष्टता उत्पन्न भएमा गाउँपालिकाको निर्णय नै
                अन्तिम निर्णय हुनेछ ।
              </text>
              <text>
                १४. आयोजनाको मर्मत सम्भारको लागि तोकिए बमोजिमको रकम गाउँपालिकाको
                मर्मत सम्भार कोषमा जम्मा गर्नुपर्नेछ ।
              </text>
            </div>

            <div className="px-10 font-bold pt-4 ">
              कार्यालयको जिम्मेवारी तथा पालना गरिने शर्तहरु :
            </div>
            <div className=" pl-16 pt-4 flex flex-col gap-2 text-sm  leading-relaxed tracking-normal ">
              <tetx>
                १. आयोजनाको बजेट, उपभोक्ता समितिका काम, कर्तव्य तथा अधिकार,
                खरिद, लेखाङ्कन, प्रतिवेदन आदि विषयमा उपभोक्ता समितिका
                पदाधिकारीहरुलाई अनुशिक्षण कार्यक्रम सञ्चालन गरिनेछ ।
              </tetx>
              <tetx>
                २. आयोजनामा आवश्यक प्राविधिक सहयोग कार्यालयबाट उपलब्ध गराउन
                सकिने अवस्थामा गराईनेछ र नसकिने अवस्थामा भएमा उपभोक्ता समितिले
                बाह्य बजारबाट सेवा परामर्श अन्तर्गत सेवा लिन सक्नेछ ।
              </tetx>
              <tetx>
                ३. आयोजनाको प्राविधिक सुपरिवेक्षणका लागि कार्यालयको तर्फबाट
                प्राविधिक खटाईनेछ । उपभोक्ता समितिबाट भएको कामको नियमित
                सुपरिवेक्षण गर्ने जिम्मेवारी निज प्राविधिकको हुनेछ ।
              </tetx>
              <tetx>
                ४. पेश्की लिएर लामो समयसम्म आयोजना नगर्ने उपभोक्ता समितिलाई
                कार्यालयले नियम अनुसार कारवाही गर्नेछ ।
              </tetx>
              <tetx>
                ५. श्रममुलक प्रविधिबाट कार्य गराउने गरी लागत अनुमान स्वीकृत गराई
                सोही बमोजिम सम्झौता गरी मेशिनरी उपकरणको प्रयोगबाट कार्य गरेको
                पाईएमा त्यस्तो उपभोक्ता समितिसंग सम्झौता रद्ध गरी उपभोक्ता
                समितिलाई भुक्तानी गरिएको रकम मुल्यांकन गरी बढी भएको रकम सरकारी
                बाँकी सरह असुल उपर गरिनेछ ।
              </tetx>
              <tetx>
                ६. आयोजना सम्पन्न भएपछि कार्यालयबाट जाँच पास गरी फरफारक गर्नु
                पर्नेछ ।
              </tetx>
              <tetx>
                ७. आवश्यक कागजात संलग्न गरी भुक्तानी उपलब्ध गराउन सम्बन्धित
                उपभोक्ता समितिबाट अनुरोध भई आएपछि उपभोक्ता समितिको बैंक खातामा
                भुक्तानी दिनु पर्नेछ ।
              </tetx>
              <tetx>
                ८. यसमा उल्लेख नभएका कुराहरु प्रचलित कानून बमोजिम हुनेछ ।
              </tetx>
            </div>

            <div className="px-10 font-bold pt-4 ">
              उपयुक्त बमोजिम गर्न हामी मञ्जुर छौ ।
            </div>
            <div className="pl-12 pt-4 flex justify-between ">
              <div className="flex flex-col gap-6">
                <text className="font-bold">फिदिम नगरपालिका तर्फवाटः</text>
                <text> नाम: </text>
                <text>पद: </text>
                <text>हस्ताक्षर:</text>
              </div>

              <div className="flex flex-col gap-6">
                <text className="font-bold">योजना शाखाको तर्फबाट:</text>
                <text> नाम: </text>
                <text>पद: </text>
                <text>हस्ताक्षर:</text>
              </div>

              <div className="flex flex-col gap-2">
                <text className="font-bold">उपभोक्ता समितिको तर्फवाटः</text>
                <text> अध्यक्षको नामः </text>
                <text>सही: </text>
                <text>सचिवको नामः</text>
                <text>सही:</text>
                <text>रोहवरः</text>
              </div>
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
export default Aanusuchi2;
