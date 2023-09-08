import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import {
  businnessClosePrint,
  getBusinessCloseFielUpload,
} from "../../../../services/apiServices/sifarish/businessClose/businessClose";
import Image from "next/image";

export default function DetailsId() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        businnessClosePrint(query?.id).then((response) => {
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
        getBusinessCloseFielUpload(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"व्यवसाय बन्द विवरण"} />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">आवेदनको विवरण</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय/फरम को नाम(Nepali) :
              </span>
              {apiData?.bewasayaFaramName_Np}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसायी को नाम(Nepali) :
              </span>
              {apiData?.bewasayiName_Np}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय रहेको स्थान(Nepali) :
              </span>
              {apiData?.bewasayaPlace_Np}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय रहेको घरको नं.(Nepali) :
              </span>
              {apiData?.bewasayaGharNo}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय/फरम को नाम(English) :
              </span>
              {apiData?.bewasayaFaramName_En}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसायी को नाम(English) :
              </span>
              {apiData?.bewasayiName_En}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय रहेको स्थान(English) :
              </span>
              {apiData?.bewasayaPlace_En}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                ब्यवसाय बन्द भएको वर्ष :
              </span>
              {apiData?.bewasayaBandYear}
            </p>
          </div>
        </div>
      </div>
      <br />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">
            संस्थाको पूरा ठेगाना
          </p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-72 px-5 inline-block text-right">
                प्रदेश :
              </span>
              {apiData?.stateName}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                गा.पा./न.पा. :
              </span>
              {apiData?.palikaName}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय प्रकार(Nepali) :
              </span>
              {apiData?.bewasayaType_Np}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय प्रकृति(Nepali) :
              </span>
              {apiData?.bewasayaPrakriti_Np}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय टोल नाम(Nepali) :
              </span>
              {apiData?.bewasayaToleName_Np}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय बाटोको नाम(Nepali) :
              </span>
              {apiData?.bewasayaBatoName_Np}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय वडा नं :
              </span>
              {apiData?.bewasayaWardNo}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-72 px-5 inline-block text-right">
                जिल्ला :
              </span>
              {apiData?.districtName}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                वडा नं :
              </span>
              {apiData?.wardNo}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय प्रकार(English) :
              </span>
              {apiData?.bewasayaType_En}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय प्रकृति(English) :
              </span>
              {apiData?.bewasayaPrakriti_En}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय टोल नाम(English) :
              </span>
              {apiData?.bewasayaToleName_En}
            </p>
            <p>
              <span className="w-72 px-5 inline-block text-right">
                व्यवसाय बाटोको नाम(English) :
              </span>
              {apiData?.bewasayaBatoName_En}
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
