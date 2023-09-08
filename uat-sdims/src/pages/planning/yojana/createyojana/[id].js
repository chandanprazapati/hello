import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
import { yojana } from "../../../../services/apiServices/planning/yojana/yojanaService";
import CreateYojana from "../../../../components/planning/yojana/CreateYojana";
const CreateWorkType = dynamic(
  () => import("../../../../components/planning/workType/CreateWorkType"),
  { ssr: false }
);
const CreateWorkTypeById = () => {
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "apiData");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let workTypeApiData = () => {
      yojana().then((response) => {
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
    workTypeApiData();
  }, []);

  let filteredData = apiData.find(
    (item) => item.yojanaSetupId === parseInt(query.id)
  );

  return (
    <>
      <SeoOptimization title={"Yojana"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateYojana clickedIdData={filteredData} />
      )}
    </>
  );
};


export default CreateWorkTypeById