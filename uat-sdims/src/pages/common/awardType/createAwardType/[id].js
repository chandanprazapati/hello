import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { awardType } from "../../../../services/apiServices/common/awardType/awardTypeService";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
const CreateAward = dynamic(
  () => import("../../../../components/common/awardType/CreateAwardType"),
  { ssr: false }
);
export default function CreateAwardTypeId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await awardType();
        if (status === true) {
          setApiData(data);
          setLoading(false);
        } else {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      } catch (error) {
        // Handle error case
        setError("An error occurred while fetching office data.");
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(
    () => apiData.find((item) => item.id === parseInt(query.id)),
    [apiData, query.id]
  );

  return (
    <React.Fragment>
      <SeoOptimization title={"Award Type"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateAward key={query.id} clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
