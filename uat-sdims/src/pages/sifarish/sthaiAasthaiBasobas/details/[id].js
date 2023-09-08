import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import {
  getBasobasFile,
  printBasobas,
} from "../../../../services/apiServices/sifarish/sthaiAsthaiBasobas/sthaiAsthaiBasobasService";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Detail() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "basobas");
  const { query } = useRouter();
  console.log(query?.id, "qid");

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        printBasobas(query?.id).then((response) => {
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
        getBasobasFile(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"स्थाई/अस्थाई बसोबास विवरण"} />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold">१. विवरण</p>
          <p className="text-center text-2xl font-bold pt-6">
            बसोबास प्रकार :
            <span className=" inline-block w-20">
              {apiData?.basobasTypeName}
            </span>
          </p>
        </div>
        <div className="pt-8  ">
          <p className="text-center text-lg underline">बसोबास गर्नेको विवरण</p>
          <div className="flex justify-evenly">
            <div className="pt-7 leading-8">
              <p>
                <span className="w-48 px-5 inline-block text-right">
                  बसोबास गरेको मिति :
                </span>
                {apiData?.basobasMiti}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  प्रदेश :
                </span>
                {apiData?.permaStateName}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  गा.पा./न.पा. :
                </span>
                {apiData?.permaPalikaName}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  ना.प्र.प.नं. :
                </span>
                {apiData?.nagariktaPraPaNo}
              </p>
            </div>
            <div className="pt-7 leading-8">
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  नाम थर :
                </span>
                {apiData?.naamThar}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  जिल्ला :
                </span>
                {apiData?.nagariktaIssueDistrictName}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  वडा नं. :
                </span>
                {apiData?.permaWardNo}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  ना.प्र.प जारी जिल्ला :
                </span>
                {apiData?.nagariktaIssueDistrictName}
              </p>
            </div>
          </div>
        </div>
        <div className="pt-8  ">
          <p className="text-center text-lg underline">घरधनीको विवरण</p>
          <div className="flex justify-evenly">
            <div className="pt-7 leading-8">
              <p>
                <span className="w-48 px-5 inline-block text-right">
                  नाम थर :
                </span>
                {apiData?.ghardhaniNaamThar}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  ना.प्र.प.नं. :
                </span>
                {apiData?.ghardhaniNagariktaPraPaNo}
              </p>
            </div>
            <div className="pt-7 leading-8">
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  नाम थर(Eng) :
                </span>
                {apiData?.ghardhaniFullName}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black mt-4">
        <div className=" p-3">
          <p className="text-center text-2xl font-bold pb-6">२. घरको विवरण</p>

          <table class="border-collapse border border-slate-400 w-full pb-20">
            <thead>
              <tr>
                <th class="border border-slate-600">टोल </th>
                <th class="border border-slate-600">बाटो </th>
                <th class="border border-slate-600">घर नं </th>
              </tr>
            </thead>
            <tbody>
              {apiData?.basobasGharDetailModelList?.map((items, index) => {
                return (
                  <tr>
                    {/* <td class="border border-slate-600 text-center">
                    {index + 1}
                  </td> */}
                    <td class="border border-slate-600 text-center">
                      {items?.tole}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.bato}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.gharNo}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black mt-4">
        <div className="pt-8  ">
          <p className="text-center text-lg underline">३. निवेदकको विवरण</p>
          <div className="flex justify-evenly">
            <div className="pt-7 leading-8">
              <p>
                <span className="w-48 px-5 inline-block text-right">
                  पूरा नाम थर :
                </span>
                {apiData?.basobasNivedak?.infNaamThar}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  प्रदेश :
                </span>
                {apiData?.basobasNivedak?.infStateName}
              </p>
              <p>
                <span className="w-48 px-5 inline-block text-right">
                  गा.पा./न.पा. :
                </span>
                {apiData?.basobasNivedak?.infPalikaName}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  ना.प्र.प.नं. :
                </span>
                {apiData?.basobasNivedak?.infNagariktaPraPaNo}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  ना.प्र.प जारी जिल्ला :
                </span>
                {apiData?.basobasNivedak?.infNagariktaIssueDistrictName}
              </p>
            </div>
            <div className="pt-7 leading-8">
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  पूरा नाम थर(Eng) :
                </span>
                {apiData?.basobasNivedak?.infFullName}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  जिल्ला :
                </span>
                {apiData?.basobasNivedak?.infDistrictName}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  वडा नं. :
                </span>
                {apiData?.basobasNivedak?.infWardNo}
              </p>
              <p>
                <span className="w-48 px-5 text-right inline-block">
                  ना.प्र.प जारी मिति :
                </span>
                {apiData?.basobasNivedak?.infNagariktaIssueDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black mt-4">
        <div className=" p-3">
          <p className="text-center text-2xl font-bold pb-6">४. फेमली विवरण</p>

          <table class="border-collapse border border-slate-400 w-full pb-20">
            <thead>
              <tr>
                <th class="border border-slate-600">नाम थर </th>
                <th class="border border-slate-600">नाता </th>
                <th class="border border-slate-600">कैफियत </th>
              </tr>
            </thead>
            <tbody>
              {apiData?.basobasFamilyList?.map((items, index) => {
                return (
                  <tr>
                    <td class="border border-slate-600 text-center">
                      {items?.naamThar}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.relationName}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
