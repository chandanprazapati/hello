import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { workArea } from "../../../../services/apiServices/planning/workArea/workAreaService";
import dynamic from "next/dynamic";
const CreateWork = dynamic(
  () => import("../../../../components/planning/workArea/CreateWork"),
  { ssr: false }
);
const CreateWorkAreaById = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let workAreaApiData = () => {
      workArea().then((response) => {
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
    (item) => item.workAreaId === parseInt(query.id)
  );

  return (
    <>
      <SeoOptimization title={"Create Work Area"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateWork clickedIdData={filteredData} />
      )}
    </>
  );
};

export default CreateWorkAreaById;
