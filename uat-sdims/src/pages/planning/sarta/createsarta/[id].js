import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import dynamic from "next/dynamic";
import { sartaSetup } from "../../../../services/apiServices/planning/sartaSetup/sartaSetupService";
const CreateSartaSetup = dynamic(
  () => import("../../../../components/planning/sartaSetup/CreateSartaSetup"),
  { ssr: false }
);
const CreateSartaById = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let sartaAPiData = () => {
      sartaSetup().then((response) => {
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
    sartaAPiData();
  }, []);

  let filteredData = apiData.find(
    (item) => item.sartaSetupId === parseInt(query.id)
  );

  return (
    <>
      <SeoOptimization title={"Sarta Setup"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateSartaSetup clickedIdData={filteredData} />
      )}
    </>
  );
};

export default CreateSartaById;
