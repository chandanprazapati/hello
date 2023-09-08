import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
import { upaChetraDetail } from "../../../../services/apiServices/planning/upaChetraDetail/upachetraDetailService";
const CreateUpaChetraDetail = dynamic(
  () => import("./"),
  { ssr: false }
);
const CreateUpaChetraDetailId = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let workAreaApiData = () => {
      upaChetraDetail().then((response) => {
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
    workAreaApiData();
  }, []);

  let filteredData = apiData.find(
    (item) => item.upaChetraDetailId === parseInt(query.id)
  );

  return (
    <>
      <SeoOptimization title={"Upa Chetra Detail"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateUpaChetraDetail clickedIdData={filteredData} />
      )}
    </>
  );
};

export default CreateUpaChetraDetailId;
