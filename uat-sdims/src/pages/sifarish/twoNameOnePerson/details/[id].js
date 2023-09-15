import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import Image from "next/image";
import {
  getDocsTwoNameOnePerson,
  twoNameOnePersonPrintData,
} from "../../../../services/apiServices/sifarish/twoNameOnePerson/twoNameOnePersonService";
import { useRouter } from "next/router";

export default function DetailsTwoNameOnePerson() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        twoNameOnePersonPrintData(query?.id).then((response) => {
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
      receiptApiData();
    }
  }, [query?.id]);
  const [imgPreview, setImgPreview] = useState();
  // console.log(imgPreview, "imgPreview");
  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        getDocsTwoNameOnePerson(query?.id).then((response) => {
          try {
            response.status === true;
            {
              setImgPreview(response.data);
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
          }
        });
      };
      receiptApiData();
    }
  }, [query?.id]);
  return (
    <>
      <CommonHeaderDesign title={"दुई नाम एक व्यक्ति विवरण"} />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">१. व्यक्तिगत विवरण</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                पुरा नाम :
              </span>
              {apiData?.actualName_Nepali}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                अर्को पुरा नाम :
              </span>
              {apiData?.differentName_Nepali}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जन्म मिति :
              </span>
              {apiData?.dateOfBirth_Nepali}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जारी मिति :
              </span>
              {apiData?.nagariktaIssueDate}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                पुरा नाम(Eng) :
              </span>
              {apiData?.actualName_English}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                अर्को पुरा नाम(Eng) :
              </span>
              {apiData?.differentName_English}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                नागरिकता नं :
              </span>
              {apiData?.nagariktaPraPaNo}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जारी जिल्ला :
              </span>
              {apiData?.nagariktaIssueDistrict}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black mt-5 ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">२. ठेगाना</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                प्रदेश :
              </span>
              {apiData?.stateId}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                गा.पा./न.पा. :
              </span>
              {apiData?.palikaId}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.districtId}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं :
              </span>
              {apiData?.ward}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black mt-5 ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">
            ३. बाबु/आमा को विवरण
          </p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                बुबाको नाम :
              </span>
              {apiData?.fatherName_Nepali}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                बुबाको नागरिकता नं :
              </span>
              {apiData?.fathersNagariktaPraPaNo}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                आमाको नाम(Eng) :
              </span>
              {apiData?.motherName_Englsih}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                बुबाको नाम(English) :
              </span>
              {apiData?.fatherName_English}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                आमाको नाम :
              </span>
              {apiData?.motherName_Nepali}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                आमाको नागरिकता नं :
              </span>
              {apiData?.motherNagariktaPraPaNo}
            </p>
          </div>
        </div>
      </div>
      <div className=" pt-8">
        <p className=" text-2xl font-bold">अपलोड भएका कागजात</p>
      </div>
      <div className=" pt-6 flex">
        {imgPreview?.map((items, index) => (
          <div key={index}>
            <Image
              src={`http://192.168.1.100:100/${items.filePath}`}
              alt={`Preview ${index}`}
              width={200}
              height={200}
              style={{ maxWidth: "100%" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
