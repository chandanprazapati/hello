import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import { serviceRate } from "../../../../services/apiServices/revenue/serviceRate/serviceRateService";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const CreateServiceRate = dynamic(
  () => import("../../../../components/revenue/controllers/serviceRate/CreateServiceRate"),
  {
    ssr: false,
  }
);
const CreateserviceRateId = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let serviceCategoryApiData = () => {
      serviceRate().then((response) => {
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
    serviceCategoryApiData();
  }, []);

  let filteredData = apiData.find(
    (item) => item.id === parseInt(query.servicerateid)
  );
  return (
    <React.Fragment>
      <SeoOptimization title={"Create Service Rate"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateServiceRate clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
};

export default CreateserviceRateId;
