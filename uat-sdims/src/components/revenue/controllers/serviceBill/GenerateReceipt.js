import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AiOutlineDownload } from "react-icons/ai";
import { useRouter } from "next/router";
import { generateReceipt } from "../../../../services/apiServices/revenue/service/serviceBill";

const GenerateReceipt = () => {
  const router = useRouter();
  const userId = router?.query?.id;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //   for genrate receipt according to id

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userId) {
      let receiptApiData = () => {
        generateReceipt(userId).then((response) => {
          try {
            response.status === true;
            {
              setApiData(response.data);
              setLoading(false);
            }
          } catch (error) {
            toast.error(response.message, {
              autoClose: 1000,
            });
          }
        });
      };
      receiptApiData();
    }
  }, [userId]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <div className="flex-col pt-4 bg-[#F0F1F5] px-3 ">
          <div
            className="flex flex-col xl:flex-row my-10 gap-8"
            ref={componentRef}
          >
            <div className="flex flex-col gap-40" >
            <div className="bg-white rounded-xl p-5 w-full ">
              <div className="flex justify-between  ">
                <div>
                  <Image
                    src="https://res.cloudinary.com/dg1opyudu/image/upload/v1678796501/SDIMS/Emblem_of_Nepal_c3mw8w.png"
                    height={120}
                    width={120}
                    alt="nagarpalika logo"
                  />
                </div>
                <div>
                  <div className="text-2xl font-extrabold">फिदिम नगरपालिका</div>
                  <div className="text-xl font-bold text-center ">
                    बौधीमाई नगरपालिका
                  </div>
                  <div className="text-center">801022012</div>
                  <div className="text-center">प्रदेश १, नेपाल</div>
                  <div className="text-center">नगदी/ प्राप्ती रसिद</div>
                </div>
                <div>म.ले.प. फारम नं. : १०१</div>
              </div>
              <br/>
             
              <div className="flex justify-between mt-5">
                <div>
                  <div>विद्युतीय कारोबार संकेत नं :</div>
                  <div>
                    श्री {apiData?.name},बाट देहाय बमोजिम जम्मा रु.
                    {apiData?.amount} रुपैयाँ भुक्तानी गरिएको छ ।
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 ">
                    <div className="font-bold">रसिद नं.:</div>{" "}
                    <div>{apiData?.invoiceNo}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">मिति :</div>{" "}
                    <div>{apiData?.billMiti}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">आ.ब.:</div>{" "}
                    <div>{apiData?.fiscalYearName}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-5">
                <div className="w-3/4  ">
                  {apiData?.printDetails?.map((items, index) => {
                    return (
                      <table key={index} className="border border-slate-600  " >
                        <thead >
                          <tr>
                            <th className="border border-slate-600 " >क्र.सं.</th>
                            <th colSpan="2" className="border border-slate-600 " >प्राप्ति शिर्षक</th>
                            <th className="border border-slate-600 " >बापत / प्रयोजन</th>
                            <th className="border border-slate-600 " >रकम रू</th>
                            <th className="border border-slate-600 ">प्राप्तिको माध्यम</th>
                            <th className="border border-slate-600 ">चेक वा अन्य वित्तीय उपकरणका हकमा</th>
                          </tr>

                          <tr>
                            <th className="border border-slate-600 " >(१)</th>
                            <th className="border border-slate-600 " >संकेत नम्बर (२)</th>
                            <th className="border border-slate-600 " >विवरण (३) </th>
                            <th className="border border-slate-600 " >(४)</th>
                            <th className="border border-slate-600 " >(५)</th>
                            <th className="border border-slate-600 " >(६)</th>
                            <th className="border border-slate-600 " >चेक/अन्य नं(७)</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className="border border-slate-600 " >{index + 1}</td>
                            <td className="border border-slate-600 " >{items.codeNo}</td>
                            <td className="border border-slate-600 " >{items.name}</td>
                            <td className="border border-slate-600 " >{items?.pariyojanaName}</td>
                            <td className="border border-slate-600 " >{items.amount}</td>
                            <td className="border border-slate-600 " >{items.paymentType}नगद </td>
                            <td className="border border-slate-600 " ></td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="4" className="border border-slate-600 " >
                              (आ.ब.: {apiData.fiscalYearName}) जम्मा रकम (अंकमा)
                            </th>
                            <th>{items.amount}</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </tfoot>
                      </table>
                    );
                  })}
                </div>
                <div className="w-2/6 shadow-2xl p-4 bg-slate-200 ">
                  <li> कर तिरि गाउँको बिकास निर्माणमा सहभागी बनौं।</li>
                  <li>
                    गाउँपालिकालाई तिर्नुपर्ने सम्पूर्ण कर चुक्ता नगरे कुनै पनि
                    सेवा सुबिधा उपलब्ध गराउन कार्यालय बाध्य हुने छैन।
                  </li>
                  <li className="">
                    कर तिर्नु, सबै गाउँबासिहरुको कर्तव्य हो भने सेवा प्राप्त
                    गर्नु अधिकार हो।
                  </li>
                  <li>कर तिरौं, सभ्य नागरिक बनौं।</li>
                  <li> समयमै कर तिरौं, जरिवानाबाट बचौं। </li>

                  <div className="pt-4 text-center font-bold  ">
                    कर सम्बन्धी विस्तृत जानकारीको लागि राजश्व प्रशासन शाखामा
                    सम्पर्क राख्नु होला।
                  </div>

                  <div className="pt-4 text-center  ">
                    कर तिर्नु भएकोमा धन्यवाद।
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-5">
                <div className="font-bold flex gap-2 flex-col">
                  <div>बुझाउनेको सही : ..............................</div>
                  <div>स्थायी लेखा नं. :</div>
                  <div>प्रिन्ट मिति :</div>
                  <div>विद्युतीय रसिद जारी हुँदाको हकमा :</div>
                </div>
                <div className="font-bold flex gap-2 flex-col">
                  <div>बुझिलिनेको सही : ................................</div>
                  <div>नाम :</div>
                  <div>दर्जा :</div>
                  <div>प्रिन्ट गर्नेको नाम :</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 w-full ">
              <div className="flex justify-between  ">
                <div>
                  <Image
                    src="https://res.cloudinary.com/dg1opyudu/image/upload/v1678796501/SDIMS/Emblem_of_Nepal_c3mw8w.png"
                    height={120}
                    width={120}
                    alt="nagarpalika logo"
                  />
                </div>
                <div>
                  <div className="text-2xl font-extrabold">फिदिम नगरपालिका</div>
                  <div className="text-xl font-bold text-center ">
                    बौधीमाई नगरपालिका
                  </div>
                  <div className="text-center">801022012</div>
                  <div className="text-center">प्रदेश १, नेपाल</div>
                  <div className="text-center">नगदी/ प्राप्ती रसिद</div>
                </div>
                <div>म.ले.प. फारम नं. : १०१</div>
              </div>
              <div className="flex justify-between mt-5">
                <div>
                  <div>विद्युतीय कारोबार संकेत नं :</div>
                  <div>
                    श्री {apiData?.name},बाट देहाय बमोजिम जम्मा रु.
                    {apiData?.amount} रुपैयाँ भुक्तानी गरिएको छ ।
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 ">
                    <div className="font-bold">रसिद नं.:</div>{" "}
                    <div>{apiData?.invoiceNo}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">मिति :</div>{" "}
                    <div>{apiData?.billMiti}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">आ.ब.:</div>{" "}
                    <div>{apiData?.fiscalYearName}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-5">
                <div className="w-3/4  ">
                  {apiData?.printDetails?.map((items, index) => {
                    return (
                      <table key={index} className="border border-slate-600  " >
                        <thead >
                          <tr>
                            <th className="border border-slate-600 " >क्र.सं.</th>
                            <th colSpan="2" className="border border-slate-600 " >प्राप्ति शिर्षक</th>
                            <th className="border border-slate-600 " >बापत / प्रयोजन</th>
                            <th className="border border-slate-600 " >रकम रू</th>
                            <th className="border border-slate-600 ">प्राप्तिको माध्यम</th>
                            <th className="border border-slate-600 ">चेक वा अन्य वित्तीय उपकरणका हकमा</th>
                          </tr>

                          <tr>
                            <th className="border border-slate-600 " >(१)</th>
                            <th className="border border-slate-600 " >संकेत नम्बर (२)</th>
                            <th className="border border-slate-600 " >विवरण (३) </th>
                            <th className="border border-slate-600 " >(४)</th>
                            <th className="border border-slate-600 " >(५)</th>
                            <th className="border border-slate-600 " >(६)</th>
                            <th className="border border-slate-600 " >चेक/अन्य नं(७)</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className="border border-slate-600 " >{index + 1}</td>
                            <td className="border border-slate-600 " >{items.codeNo}</td>
                            <td className="border border-slate-600 " >{items.name}</td>
                            <td className="border border-slate-600 " >{items?.pariyojanaName}</td>
                            <td className="border border-slate-600 " >{items.amount}</td>
                            <td className="border border-slate-600 " >{items.paymentType}नगद </td>
                            <td className="border border-slate-600 " ></td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="4" className="border border-slate-600 " >
                              (आ.ब.: {apiData.fiscalYearName}) जम्मा रकम (अंकमा)
                            </th>
                            <th>{items.amount}</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </tfoot>
                      </table>
                    );
                  })}
                </div>
                <div className="w-2/6 shadow-2xl p-4 bg-slate-200 ">
                  <li> कर तिरि गाउँको बिकास निर्माणमा सहभागी बनौं।</li>
                  <li>
                    गाउँपालिकालाई तिर्नुपर्ने सम्पूर्ण कर चुक्ता नगरे कुनै पनि
                    सेवा सुबिधा उपलब्ध गराउन कार्यालय बाध्य हुने छैन।
                  </li>
                  <li className="">
                    कर तिर्नु, सबै गाउँबासिहरुको कर्तव्य हो भने सेवा प्राप्त
                    गर्नु अधिकार हो।
                  </li>
                  <li>कर तिरौं, सभ्य नागरिक बनौं।</li>
                  <li> समयमै कर तिरौं, जरिवानाबाट बचौं। </li>

                  <div className="pt-4 text-center font-bold  ">
                    कर सम्बन्धी विस्तृत जानकारीको लागि राजश्व प्रशासन शाखामा
                    सम्पर्क राख्नु होला।
                  </div>

                  <div className="pt-4 text-center  ">
                    कर तिर्नु भएकोमा धन्यवाद।
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-5">
                <div className="font-bold flex gap-2 flex-col">
                  <div>बुझाउनेको सही : ..............................</div>
                  <div>स्थायी लेखा नं. :</div>
                  <div>प्रिन्ट मिति :</div>
                  <div>विद्युतीय रसिद जारी हुँदाको हकमा :</div>
                </div>
                <div className="font-bold flex gap-2 flex-col">
                  <div>बुझिलिनेको सही : ................................</div>
                  <div>नाम :</div>
                  <div>दर्जा :</div>
                  <div>प्रिन्ट गर्नेको नाम :</div>
                </div>
              </div>
            </div>
            </div>

            
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
      )}

      
    </>
  );
};

export default GenerateReceipt;
