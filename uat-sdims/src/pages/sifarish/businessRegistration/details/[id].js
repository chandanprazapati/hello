import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import {
  businessRegistrationPrint,
  getBusinessFile,
} from "../../../../services/apiServices/sifarish/businessRegistration/businessRegistrationService";
import Image from "next/image";

export default function Detail() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    if (query?.id) {
      let receptApiData = () => {
        businessRegistrationPrint(query?.id).then((response) => {
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
        getBusinessFile(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"व्यवसाय दर्ता विवरण"} />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">व्यक्तिगत विवरण</p>
        </div>
        <div className="flex justify-around pb-8">
          <div className="pt-7 leading-8">
            <p>
              <span className=" w-72 px-5 inline-block text-right">
                व्यवसाय/फरम को नाम(Nepali) :
              </span>
              {apiData?.bewasayaFaramName_Np}
            </p>
            <p>
              <span className=" w-72 px-5 text-right inline-block">
                व्यवसायी को नाम(Nepali) :
              </span>
              {apiData?.bewasayiName_Np}
            </p>
            <p>
              <span className=" w-72 px-5 text-right inline-block">
                घरधनी को नाम(Nepali) :
              </span>
              {apiData?.gharDhaniName_Np}
            </p>
            <p>
              <span className="w-56 px-5 text-right inline-block">
                व्यवसाय रहेको स्थान(Nepali) :
              </span>
              {apiData?.bewasayaPlace_Np}
            </p>
            <p>
              <span className=" w-72 px-5 text-right inline-block">
                व्यवसाय रहेको बाटो को नाम(Nepali) :
              </span>
              {apiData?.bewasayaRoadName_Np}
            </p>
            <p>
              <span className=" w-72 px-5 text-right inline-block">
                व्यवसाय रहेको घरको नं.(Nepali) :
              </span>
              {apiData?.bewasayaGharNo}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                व्यवसाय/फरम को नाम(English) :
              </span>
              {apiData?.bewasayaFaramName_En}
            </p>
            <p>
              <span className=" w-72 px-5 text-right inline-block">
                व्यवसायी को नाम(English) :
              </span>
              {apiData?.bewasayiName_En}
            </p>
            <p>
              <span className=" w-72 px-5 text-right inline-block">
                घरधनी को नाम(English) :
              </span>
              {apiData?.gharDhaniName_En}
            </p>
            <p>
              <span className=" w-72 px-5 text-right inline-block">
                व्यवसाय रहेको स्थान(English) :
              </span>
              {apiData?.bewasayaPlace_En}
            </p>
            <p>
              <span className=" w-80 px-5 text-right inline-block">
                व्यवसाय रहेको बाटो को नाम(English) :
              </span>
              {apiData?.bewasayaRoadName_En}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black mt-4">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">
            संस्थाको पूरा ठेगाना
          </p>
        </div>
        <div className="flex justify-around pb-8">
          <div className="pt-7 leading-8">
            <p>
              <span className=" w-42 px-5 inline-block text-right">
                प्रदेश :
              </span>
              {apiData?.stateName}
            </p>
            <p>
              <span className=" w-42 px-5 text-right inline-block">
                गा.पा./न.पा.:
              </span>
              {apiData?.palikaName}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-42 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.districtName}
            </p>
            <p>
              <span className=" w-42 px-5 text-right inline-block">
                वडा नं :
              </span>
              {apiData?.bewasayaWardNo}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black mt-4">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">
            व्यावसायको पूरा विवरण
          </p>
        </div>
        <div className="flex justify-around pb-8">
          <div className="pt-7 leading-8">
            <p>
              <span className=" w-60 px-5 inline-block text-right">
                व्यवसाय प्रकार(Nepali) :
              </span>
              {apiData?.bewasayaType_Np}
            </p>
            <p>
              <span className=" w-60 px-5 text-right inline-block">
                व्यवसाय प्रकृति(Nepali) :
              </span>
              {apiData?.bewasayaPrakriti_Np}
            </p>
            <p>
              <span className=" w-60 px-5 text-right inline-block">
                व्यवसाय टोल नाम(Nepali) :
              </span>
              {apiData?.bewasayaToleName_Np}
            </p>
            <p>
              <span className="w-60 px-5 text-right inline-block">
                व्यवसाय बाटोको नाम(Nepali) :
              </span>
              {apiData?.bewasayaBatoName_Np}
            </p>
            <p>
              <span className=" w-60 px-5 text-right inline-block">
                व्यवसाय वडा नं :
              </span>
              {apiData?.bewasayaWardNo}
            </p>
            <p>
              <span className=" w-60 px-5 text-right inline-block">
                व्यवसायको फोन नं.(Nepali) :
              </span>
              {apiData?.phoneNumber}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-60 px-5 text-right inline-block">
                व्यवसाय प्रकार(English) :
              </span>
              {apiData?.bewasayaType_En}
            </p>
            <p>
              <span className=" w-60 px-5 text-right inline-block">
                व्यवसाय प्रकृति(English) :
              </span>
              {apiData?.bewasayaPrakriti_En}
            </p>
            <p>
              <span className=" w-60 px-5 text-right inline-block">
                व्यवसाय टोल नाम(English) :
              </span>
              {apiData?.bewasayaToleName_En}
            </p>
            <p>
              <span className=" w-64 px-5 text-right inline-block">
                व्यवसाय बाटोको नाम(English) :
              </span>
              {apiData?.bewasayaBatoName_En}
            </p>
            <p>
              <span className=" w-60 px-5 text-right inline-block">
                व्यवसायको इमेल :
              </span>
              {apiData?.email}
            </p>
            <p>
              <span className=" w-60 px-5 text-right inline-block">
                व्यवसाय प्यान नं. :
              </span>
              {apiData?.paNumber}
            </p>
          </div>
        </div>
      </div>
      <div className=" pt-6">
        <div className=" pb-4">
          <p className="text-center text-2xl font-bold  ">व्यावसाय विवरण</p>
        </div>
        <table class="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th class="border border-slate-600">नविकरण मिति</th>
              <th class="border border-slate-600">असुली आ.व. </th>
              <th class="border border-slate-600">रसिद नं</th>
              <th class="border border-slate-600">दस्तखत</th>
              <th class="border border-slate-600">कैफियत</th>
            </tr>
          </thead>
          <tbody>
            {apiData?.bewasayaDartaDetailList?.map((items, index) => {
              return (
                <tr>
                  <td class="border border-slate-600 text-center">
                    {items?.nabikaranDate}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.ahsuliFiscalYear}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.rasidNumber}
                  </td>
                  <td class="border border-slate-600 text-center">
                    {items?.dastakhat}
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
