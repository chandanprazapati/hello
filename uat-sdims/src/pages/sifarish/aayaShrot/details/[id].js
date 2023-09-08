import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import {
  AayaShrotPrint,
  getAayaShrotFiles,
} from "../../../../services/apiServices/sifarish/aayaShrot/aayaShrotService";
import Image from "next/image";

export default function AayashrotDetail() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  // console.log(apiData, "fyuejdfnbgfjdkm");
  const { query } = useRouter();

  useEffect(() => {
    if (query?.id) {
      let receptApiData = () => {
        AayaShrotPrint(query?.id).then((response) => {
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
      receptApiData();
    }
  }, [query?.id]);

  const [imgPreview, setImgPreview] = useState();
  // console.log(imgPreview, "imgPreview");
  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        getAayaShrotFiles(query?.id).then((response) => {
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
              {apiData?.nivedakNaamThar}
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
              <span className="w-48 px-5 text-right inline-block">जम्मा :</span>
              {apiData?.grossIncome}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 text-right inline-block">
                नाम थर (English) :
              </span>
              {apiData?.nivedakFullName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.districtName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं. :
              </span>
              {apiData?.wardNo}
            </p>
          </div>
        </div>
      </div>
      <div className=" pt-6">
        <div className=" pb-4">
          <p className="text-center text-2xl font-bold  ">आयश्रोत विवरण</p>
        </div>
        <table class="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th class="border border-slate-600">क्र.सं.</th>
              <th class="border border-slate-600">विवरण </th>
              <th class="border border-slate-600">बार्षिक आम्दानी</th>
            </tr>
          </thead>
          <tbody>
            {apiData?.aayaShrotDetailModelList?.map((items, index) => {
              return (
                <tr>
                  <td class="border border-slate-600 text-center">
                    {index + 1}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.vivaran}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.annualIncome}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
