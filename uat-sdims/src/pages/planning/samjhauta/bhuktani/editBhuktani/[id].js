import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Index = dynamic(
  () =>
    import("../createBhuktani/[id]"),
  { ssr: false }
);
import { bhuktaniListBySamjhautaId } from "../../../../../services/apiServices/planning/planningSamjhauta/planningSamjhautaService";
import SeoOptimization from "../../../../../components/reusableDesign/SeoOptimzation";
const CreateBhuktaniTypeById = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;
  const userId = router.query.id;


  useEffect(() => {
    let bhuktaniTypeApiData = () => {
        bhuktaniListBySamjhautaId(userId).then((response) => {
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
    bhuktaniTypeApiData();
  }, [userId]);

  let filteredData = apiData.find(
    (item) => item.bhuktaniTypeId === parseInt(query.id)
  );

  return (
    <>
      <SeoOptimization title={"Bhuktani Type"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <Index clickedIdData={filteredData} />
      )}
    </>
  );
};

export default CreateBhuktaniTypeById;
