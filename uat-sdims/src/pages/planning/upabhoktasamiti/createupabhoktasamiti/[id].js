import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
import { upabhoktaSamiti } from "../../../../services/apiServices/planning/upabhoktaSamiti/upabhoktaSamitiService";
const CreateUpavoktaSamiti = dynamic(
  () => import("../../../../components/planning/upavoktaSamiti/CreateUpavoktaSamiti"),
  { ssr: false }
);
const CreateUpaBhoktasamitiById = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let upabhoktaSamitiApiData = () => {
      upabhoktaSamiti().then((response) => {
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
    (item) => item.upabhoktaSamitiDetailId === parseInt(query.id)
  );

  return (
    <>
      <SeoOptimization title={" UpaBhokta Samiti"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateUpavoktaSamiti clickedIdData={filteredData} />
      )}
    </>
  );
};

export default CreateUpaBhoktasamitiById;
