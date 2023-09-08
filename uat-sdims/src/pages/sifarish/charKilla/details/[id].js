import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  getCharKillaUpload,
  printCharKilla,
} from "../../../../services/apiServices/sifarish/charKilla/charKillaService";

export default function Detail() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "charkilla");
  const { query } = useRouter();
  console.log(query?.id, "qid");

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        printCharKilla(query?.id).then((response) => {
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
        getCharKillaUpload(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"चार किल्ला विवरण"} />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">व्यक्तिगत विवरण</p>
        </div>
        <div className="flex justify-around">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                पुरा नाम :
              </span>
              {apiData?.fullName_Nepali}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                नागरिकता नं :
              </span>
              {apiData?.nagariktaPraPaNo}
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
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                सिट नं :
              </span>
              {apiData?.sheetNo}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                कर तिरेको रसिद नं :
              </span>
              {apiData?.karTireykoRasid}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.districtName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं :
              </span>
              {apiData?.permaWard}
            </p>
          </div>
        </div>
      </div>
      <div className="pt-8  ">
        <p className="text-center text-2xl font-bold  ">कित्ता विवरण</p>

        <table class="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th class="border border-slate-600">वार्ड नं</th>
              <th class="border border-slate-600">छेत्रफल </th>
              <th class="border border-slate-600">कित्ता नं</th>
              <th class="border border-slate-600">पूर्व</th>
              <th class="border border-slate-600">पश्चिम</th>
              <th class="border border-slate-600">उत्तर</th>
              <th class="border border-slate-600">दक्षिण</th>
              <th class="border border-slate-600">कैफियत</th>
            </tr>
          </thead>
          <tbody>
            {apiData?.charKillaPlotDetailViewModelList?.map((items, index) => {
              return (
                <tr>
                  {/* <td class="border border-slate-600 text-center">
                    {index + 1}
                  </td> */}
                  <td class="border border-slate-600 text-center">
                    {items?.plotWardNo}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.plotArea}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.kittaNo}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.east}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.west}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.north}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.south}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.kaifiyat}
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
