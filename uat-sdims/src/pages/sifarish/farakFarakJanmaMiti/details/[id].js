import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getDocsFarakJanmaMitiData,
  printFarakJanmaMitiData,
} from "../../../../services/apiServices/sifarish/farakFarakJanmaMiti/farakFarakJanmaMitiService";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import Image from "next/image";

export default function DetailFarakJanmaMiti() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    if (query?.id) {
      let receptApiData = () => {
        printFarakJanmaMitiData(query?.id).then((response) => {
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
  //image previews in detail from api
  const [imgPreview, setImgPreview] = useState();
  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        getDocsFarakJanmaMitiData(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"फरक फरक जन्म मिति विवरण"} />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  "> विवरण</p>
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
                आमाको नाम थर :
              </span>
              {apiData?.motherName_Nep}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">जिल्ला:</span>
              {apiData?.permaDistrictName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं :
              </span>
              {apiData?.ward}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                आमाको ना.प्र.प.नं. :
              </span>
              {apiData?.citizenNo_Mother}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                बाबुको नाम थर :
              </span>
              {apiData?.fatherName_Nep}
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
                बाबुको ना.प्र.प.नं. :
              </span>
              {apiData?.citizenNo_Father}
            </p>
          </div>
        </div>
      </div>
      <div className=" pt-6">
        <div className=" pb-4">
          <p className="text-center text-2xl font-bold  ">मिति फरकको विवरण</p>
        </div>
        <table class="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th class="border border-slate-600">हुनु पर्ने जन्ममिति</th>
              <th class="border border-slate-600">फरक भएको जन्ममिति </th>
              <th class="border border-slate-600">फरक भएको कागजात</th>
            </tr>
          </thead>
          <tbody>
            {apiData?.farakJanmaMitiCorrectionViewModelList?.map(
              (items, index) => {
                return (
                  <tr>
                    <td class="border border-slate-600 text-center">
                      {items?.janmaDateToBe}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.differentJanmaDate}
                    </td>
                    <td class="border border-slate-600 text-center">
                      {items?.differentDoc}
                    </td>
                  </tr>
                );
              }
            )}
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
