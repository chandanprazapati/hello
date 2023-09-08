import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { takeoverType } from "../../../../services/apiServices/revenue/takeoverType/takeoverTypeService";

const CreateTakeOverType = dynamic(
  () => import("../../../../components/revenue/takeOverType/CreateTakeOver"),
  { ssr: false }
);

export default function CreateTakeOverId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await takeoverType();
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
      <SeoOptimization title={"Take Over Type"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateTakeOverType clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
