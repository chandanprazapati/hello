import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
import { tolBikashSanstha } from "../../../../services/apiServices/planning/tolBikashSanstha/tolBikashSansthaService";
const CreateTolBikashSanstha = dynamic(
  () => import("../../../../components/planning/tolBikashSanstha/CreateTolBikashSanstha"),
  { ssr: false }
);
const CreateTolBikashSansthaById = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let upabhoktaSamitiApiData = () => {
      tolBikashSanstha().then((response) => {
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
    upabhoktaSamitiApiData();
  }, []);

  let filteredData = apiData.find(
    (item) => item.tolBikashSansthaId === parseInt(query.id)
  );

  return (
    <>
      <SeoOptimization title={"Tol Bikash Sanstha"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateTolBikashSanstha clickedIdData={filteredData} />
      )}
    </>
  );
};

export default CreateTolBikashSansthaById;
