import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import {
  getAnnualIncomeFiles,
  getAnnualIncomePrint,
} from "../../../../services/apiServices/sifarish/annualIncome/annualIncomeService";
import Image from "next/image";

export default function Details() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  console.log(apiData);
  const { query } = useRouter();

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        getAnnualIncomePrint(query?.id).then((response) => {
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
        getAnnualIncomeFiles(query?.id).then((response) => {
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
    <div>
      <CommonHeaderDesign title={"बार्षिक आम्दानी बिबरण"} />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">विवरण</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                नाम थर :
              </span>
              {apiData?.name_Nep}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                नागरिकता नं :
              </span>
              {apiData?.citizenNo}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                बाबुको नाम(English) :
              </span>
              {apiData?.fatherName_Eng}
            </p>
            <p>
              <span className="w-56 px-5 text-right inline-block">
                आमाको नाम(English) :
              </span>
              {apiData?.motherName_Eng}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                प्रदेश :
              </span>
              {apiData?.stateName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                गा.पा./न.पा. :
              </span>
              {apiData?.palikaName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                भाडाको आम्दानी :
              </span>
              {apiData?.annualIncomeDetail?.rentIncome}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">जम्मा :</span>
              {apiData?.annualIncomeDetail?.totalAmountNep}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                नाम थर (English) :
              </span>
              {apiData?.name_Eng}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                बाबुको नाम :
              </span>
              {apiData?.fatherName_Nep}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                आमाको नाम :
              </span>
              {apiData?.motherName_Nep}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">नाता :</span>
              {apiData?.relationName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.districtName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                व्यपारको आम्दानी :
              </span>
              {apiData?.annualIncomeDetail?.businessIncome}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                तलब आम्दानी :
              </span>
              {apiData?.annualIncomeDetail?.salaryIncome}
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
    </div>
  );
}
