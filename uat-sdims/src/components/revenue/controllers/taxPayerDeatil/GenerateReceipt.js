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
                  <div className="text-center">
                    सम्पत्ति /मालपोत तथा भूमिकर रसिद
                  </div>
                </div>
                <div>म.ले.प. फारम नं. : १०१</div>
              </div>
              <div className="flex justify-between pt-10">
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-1 ">
                    <div className="font-bold">रसिद नं.:</div>{" "}
                    <div>{apiData?.invoiceNo}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">करदाता संकेत नं : </div>{" "}
                    <div>{apiData?.billMiti}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">करदाताको नाम :</div>{" "}
                    <div>{apiData?.fiscalYearName}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">जिल्ला : </div>{" "}
                    <div>{apiData?.fiscalYearName}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">सडकको नाम :</div>{" "}
                    <div>{apiData?.fiscalYearName}</div>
                  </div>
                </div>

                <div className="flex gap-2 flex-col pt-6">
                  <div className="font-bold">
                    (मान्य अवधीः {apiData?.fiscalYearName}साल असार मसान्त सम्म)
                  </div>{" "}
                  <div>जग्गा मापन एकाइः रोपनी-आना-पैसा-दाम</div>
                  <div className="flex gap-1 pt-8 ">
                    <div className="font-bold">गा.पा /न.पा. :</div>{" "}
                    <div>{apiData?.invoiceNo}</div>
                  </div>
                </div>

                <div className="flex gap-2 flex-col">
                  <div className="flex gap-1 ">
                    <div className="font-bold">
                      पछिल्लो पटक तिरेको रसिद नं.:
                    </div>{" "}
                    <div>{apiData?.invoiceNo}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">आ.व. :</div>{" "}
                    <div>{apiData?.billMiti}</div>
                  </div>

                  <div className="flex gap-1 ">
                    <div className="font-bold">आन्तरिक संकेत नं. :</div>{" "}
                    <div>{apiData?.fiscalYearName}</div>
                  </div>
                  <div className="flex gap-1 ">
                    <div className="font-bold">मिति : </div>{" "}
                    <div>{apiData?.fiscalYearName}</div>
                  </div>
                  <div className="flex gap-1 ">
                    <div className="font-bold">वडा : </div>{" "}
                    <div>{apiData?.fiscalYearName}</div>
                  </div>
                  <div className="flex gap-1 ">
                    <div className="font-bold">घर नं. </div>{" "}
                    <div>{apiData?.fiscalYearName}</div>
                  </div>
                </div>
              </div>
              {/* <div className="flex justify-between pt-5">
                <div className="w-3/4  ">
                  {apiData?.printDetails?.map((items, index) => {
                    return (
                      <table >
                        <thead>
                          <tr>
                            <th>क्र.सं.</th>
                            <th colSpan="2">प्राप्ति शिर्षक</th>
                            <th>बापत / प्रयोजन</th>
                            <th>रकम रू</th>
                            <th>प्राप्तिको माध्यम</th>
                            <th>चेक वा अन्य वित्तीय उपकरणका हकमा</th>
                          </tr>

                          <tr>
                            <th>(१)</th>
                            <th>संकेत नम्बर (२)</th>
                            <th>विवरण (३) </th>
                            <th>(४)</th>
                            <th>(५)</th>
                            <th>(६)</th>
                            <th>चेक/अन्य नं(७)</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{items.codeNo}</td>
                            <td>{items.name}</td>
                            <td>{items?.pariyojanaName}</td>
                            <td>{items.amount}</td>
                            <td>{items.paymentType}नगद </td>
                            <td></td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="4">
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
              </div> */}

              <div className="flex justify-between pt-5">
                <div className="font-bold flex gap-2 flex-col">
                  <div>बुझाउनेको सही : ..............................</div>
                  <div>प्रिन्ट मिति :</div>
                </div>

                <div className="flex justify-center text-center w-1/3">
                  {`कृपयाः अर्को पटक कर तिर्न आउँदा यो रसिद साथमा लिएर आउनुहोला ।
                  "समयमा कर तिरौ, गाउँलाई समृध्द बनाउन सहयोग गरौ । समयमा कर
                  तिर्नु, गाउँवासीको कर्तव्य हो ।`}
                </div>
                <div className="font-bold flex gap-2 flex-col">
                  <div>बुझिलिनेको सही : ................................</div>
                  <div>प्रिन्ट गर्नेको नाम : </div>
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
