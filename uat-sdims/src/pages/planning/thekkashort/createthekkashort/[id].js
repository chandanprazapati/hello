import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import { thekkaShortType } from "../../../../services/apiServices/planning/thekkaShortType/thekkaShortTypeService";
import dynamic from "next/dynamic";
const CreateThekkaShortType = dynamic(
  () => import("../../../../components/planning/thekkaShortType/CreateThekkaShortType"),
  { ssr: false }
);
const CreateThekkaShortById = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let thekkaShortApiData = () => {
      thekkaShortType().then((response) => {
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
    thekkaShortApiData();
  }, []);

  let filteredData = apiData.find(
    (item) => item.thekkaShrotTypeId === parseInt(query.id)
  );

  return (
    <>
      <SeoOptimization title={"Thekka Short"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateThekkaShortType clickedIdData={filteredData} />
      )}
    </>
  );
};


export default CreateThekkaShortById