import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  SadakKhannePrint,
  getSadakKhanneFile,
} from "../../../../services/apiServices/sifarish/sadakKhanee/sadakKhanneService";

export default function DetailSadakKhaneID() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        SadakKhannePrint(query?.id).then((response) => {
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
        getSadakKhanneFile(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"सडक खन्ने विवरण"} />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">निवेदकको विवरण</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                नाम थर(English) :
              </span>
              {apiData?.name_Eng}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                नागरिकता नं :
              </span>
              {apiData?.citizenNo}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                नाम थर :
              </span>
              {apiData?.name_Nep}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जारी मिति :
              </span>
              {apiData?.jariMiti}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">स्थायी ठेगाना</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                प्रदेश :
              </span>
              {apiData?.state}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                गा.पा./न.पा. :
              </span>
              {apiData?.palika}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.district}
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
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">अस्थायी ठेगाना</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                प्रदेश :
              </span>
              {apiData?.sabState}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                गा.पा./न.पा. :
              </span>
              {apiData?.sabPalika}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.sabDistrict}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं :
              </span>
              {apiData?.sabWard}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">खन्ने सडकको विवरण</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                स्विकृत सडक :
              </span>
              {apiData?.roadName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                धरौटी रकम :
              </span>
              {apiData?.depositAmount}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                खन्ने म्याद(दीनमा) :
              </span>
              {apiData?.deadlinedays}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">ईकाइ :</span>
              {apiData?.depth}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                सडक खन्ने पुरा ठेगाना :
              </span>
              {apiData?.sadakKhanneAddress}
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
