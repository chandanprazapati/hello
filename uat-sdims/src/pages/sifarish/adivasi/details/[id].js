import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import {
  getAadibasiJanjatiFiles,
  printsAdibasi,
} from "../../../../services/apiServices/sifarish/aadiwasiJanajaati/aadiwasiJanjatiService";
import Image from "next/image";

export default function DetailAdivasi() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  console.log(apiData);
  const { query } = useRouter();

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        printsAdibasi(query?.id).then((response) => {
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
        getAadibasiJanjatiFiles(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"आदिवासी/जनजाती विवरण"} />
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
              {apiData?.naamThar}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">लिङ्ग :</span>
              {apiData?.genderName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.permaJillaName}
            </p>
            <p>
              <span className="w-56 px-5 text-right inline-block">
                वडा नं. :
              </span>
              {apiData?.permaWardNo}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                ना.प्र.प जारी मिति :
              </span>
              {apiData?.nagariktIssueDate}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                हजुरबुबाको नाम थर :
              </span>
              {apiData?.grandfatherNaamThar}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                बाबुको नाम थर :
              </span>
              {apiData?.fatherNaamThar}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">जाती :</span>
              {apiData?.jaati}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                सुचिकृत :
              </span>
              {apiData?.govtSuchikrit}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                नाम थर (English) :
              </span>
              {apiData?.fullName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                प्रदेश :
              </span>
              {apiData?.permaPradeshName}
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
            <p>
              <span className="w-48 px-5 text-right inline-block">
                ना.प्र.प जारी जिल्ला :
              </span>
              {apiData?.nagariktaIssueDistrictName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                हजुरबुबाको नाम थर(In English) :
              </span>
              {apiData?.grandfatherFullName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                बाबुको नाम थर(In English) :
              </span>
              {apiData?.fatherFullName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                आदिवासी प्रकार :
              </span>
              {apiData?.aadibasiTypeName}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 rounded-3xl shadow-2xl border-2 border-black ">
        <div className="pt-8  ">
          <p className="text-center text-2xl font-bold  ">निवेदकको विवरण</p>
        </div>
        <div className="flex justify-around  ">
          <div className="pt-7 leading-8">
            <p>
              <span className="w-48 px-5 inline-block text-right">
                पूरा नाम थर :
              </span>
              {apiData?.aadiwasiNivedak?.infNaamThar}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                प्रदेश :
              </span>
              {apiData?.aadiwasiNivedak?.infStateId}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                गा.पा./न.पा. :
              </span>
              {apiData?.aadiwasiNivedak?.infPalikaId}
            </p>
            <p>
              <span className="w-56 px-5 text-right inline-block">
                ना.प्र.प.नं. :
              </span>
              {apiData?.aadiwasiNivedak?.infNagariktaPraPaNo}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                ना.प्र.प जारी जिल्ला :
              </span>
              {apiData?.aadiwasiNivedak?.infNagariktaIssueDistrictId}
            </p>
          </div>
          <div className="pt-7 leading-8">
            <p>
              <span className="w-56 px-5 text-right inline-block">
                पूरा नाम थर(In English) :
              </span>
              {apiData?.aadiwasiNivedak?.infFullName}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                जिल्ला :
              </span>
              {apiData?.aadiwasiNivedak?.infDistrictId}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                वडा नं. :
              </span>
              {apiData?.aadiwasiNivedak?.infWardNo}
            </p>
            <p>
              <span className="w-48 px-5 text-right inline-block">
                ना.प्र.प जारी मिति :
              </span>
              {apiData?.aadiwasiNivedak?.infNagariktaIssueDate}
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
