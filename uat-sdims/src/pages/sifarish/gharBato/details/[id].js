import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import {
  getDocsGharBatoPramanit,
  printGharBatoPramanit,
} from "../../../../services/apiServices/sifarish/gharBatoPramanit/gharBatoPramanitService";
import { useRouter } from "next/router";
import Image from "next/image";

export default function DetailGharBato() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "GharBato");
  const { query } = useRouter();
  console.log(query?.id, "qid");

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        printGharBatoPramanit(query?.id).then((response) => {
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
        getDocsGharBatoPramanit(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"घर बाटो प्रमाणित विवरण"} />
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
              {apiData?.name}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जग्गाको मुल्य :
              </span>
              {apiData?.landRate}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                कित्ता नं :
              </span>
              {apiData?.kittaNo}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 text-right inline-block">
                क्षेत्रफल :
              </span>
              {apiData?.area}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                घरको मुल्य :
              </span>
              {apiData?.houseRate}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                सित नं. :
              </span>
              {apiData?.sitNo}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black mt-5">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">स्थायी ठेगाना</p>
        </div>
        <div className="flex justify-around">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                प्रदेश :
              </span>
              {apiData?.perState}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                गा.पा./न.पा. :
              </span>
              {apiData?.perPalika}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.perDistrict}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं. :
              </span>
              {apiData?.perWard}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black  mt-5">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">अस्थायी ठेगाना</p>
        </div>
        <div className="flex justify-around">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                प्रदेश :
              </span>
              {apiData?.tempState}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                गा.पा./न.पा. :
              </span>
              {apiData?.tempPalika}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.tempDistrict}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं. :
              </span>
              {apiData?.tempWard}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black  mt-5 ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">
            जग्गाको पुरा ठेगाना
          </p>
        </div>
        <div className="flex justify-around">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                प्रदेश :
              </span>
              {apiData?.landState}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                गा.पा./न.पा. :
              </span>
              {apiData?.landPalika}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.landDistrict}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं. :
              </span>
              {apiData?.landWard}
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
