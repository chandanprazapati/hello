import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { documentType } from "../../../../services/apiServices/planning/documentType/documentTypeService";
import dynamic from "next/dynamic";
const CreateDocs = dynamic(
  () => import("../../../../pages/planning/document/createdocument/index"),
  { ssr: false }
);
const CreateDocumentTypeById = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let documentTypeApiData = () => {
      documentType().then((response) => {
        try {
          response.status === true;
          {
            setApiData(response.data);
            setLoading(false);
          }
        } catch (error) {
          toast.error(response.message, {
            autoClose: 1000,
          });
        }
      });
    };
    documentTypeApiData();
  }, []);

  let filteredData = apiData.find(
    (item) => item.documentTypeId === parseInt(query.id)
  );

  return (
    <>
      <SeoOptimization title={"Document Type"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateDocs clickedIdData={filteredData} />
      )}
    </>
  );
};

export default CreateDocumentTypeById;
