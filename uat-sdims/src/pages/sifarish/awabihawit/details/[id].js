import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { awabihawitDetails } from "../../../../services/apiServices/sifarish/awabiwahit/awabiwahitService";
import { useRouter } from "next/router";
import { englishToNepali } from "../../../../utils/utility";

export default function Details() {
  const { query } = useRouter();
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "apiData");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        awabihawitDetails(query?.id).then((response) => {
          try {
            response.status === true;
            {
              setApiData(response.data);
              setLoading(false);
            }
          } catch (error) {
            // toast.success(response.message, {
            //   autoClose: 1000,
            // });
          }
        });
      };
      receiptApiData();
    }
  }, [query?.id]);

  return (
    <div>
      <CommonHeaderDesign title={"अविवाहित विवरण"} />
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">१. व्यक्तिगत विवरण</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                पूरा नाम थर :
              </span>
              {apiData?.fullName_Nepali}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                कर तिरेको रसिद नं :
              </span>
              {apiData?.karRasidNo}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जन्म मिति(AD) :
              </span>
              {/* {englishToNepali(apiData?.doB_English)} */}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                नागरिकता जारी जिल्ला :
              </span>
              {apiData?.nagriktaJariJillaName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                राहदानी नं :
              </span>
              {apiData?.passportNo}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">परदेश :</span>
              {apiData?.stateName}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                पूरा नाम थर (In English) :
              </span>
              {/* {apiData?.fullName_English} */}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जन्म मिति(BS) :
              </span>
              २०६९-०१-०५
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                नागरिकता नं :
              </span>
              12345
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जारी मिति :
              </span>
              २०७९-०१-१३
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                राहदानी जारी मिति :
              </span>
              २०८०-०१-०४
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जिल्ला :
              </span>
              ललितपुर
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं :
              </span>
              १०
            </p>
          </div>
        </div>
      </div>

      <br />

      <div className=" bg-gray-200 rounded-3xl shadow-2xl pb-8 border-2 border-black  ">
        <div className="pt-8">
          <p className="text-center text-2xl font-bold ">२. बाबुको विवरण</p>
        </div>
        <div className="flex justify-around">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 text-right inline-block">
                बाबुको नाम :
              </span>
              ram thapa
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                नागरिकता नं :
              </span>
              123456
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-52 px-5 text-right inline-block">
                बाबुको नाम(English) :
              </span>
              ram thapa
            </p>
          </div>
        </div>
      </div>

      <br />

      <div className=" bg-gray-200 rounded-3xl shadow-2xl pb-8 border-2 border-black  ">
        <div className="pt-8">
          <p className="text-center text-2xl font-bold ">३. आमाको विवरण</p>
        </div>
        <div className="flex justify-around">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 text-right inline-block">
                आमाको नाम :
              </span>
              maya thapa
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                नागरिकता नं :
              </span>
              1234567
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-52 px-5 text-right inline-block">
                आमाको नाम(English) :
              </span>
              maya thapa
            </p>
          </div>
        </div>
      </div>

      <div className=" pt-8">
        <p className=" text-2xl font-bold">अपलोड भएका कागजात</p>
      </div>
      <div className="flex justify-center">
        <div className="shadow-2xl shadow-indigo-500/50 rounded-md w-64 h-40 mt-8">
          <a className="justify-center text-center flex">img</a>
        </div>
      </div>
    </div>
  );
}
