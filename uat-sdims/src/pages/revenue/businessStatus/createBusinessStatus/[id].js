import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { businessStatus } from "../../../../services/apiServices/revenue/businessStatus/businessStatusService";
const CreateBusinessStatus = dynamic(
  () =>
    import(
      "../../../../components/revenue/businessStatus/CreateBusinessStatus"
    ),
  { ssr: false }
);

export default function CreateBusinessStatusId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await businessStatus();
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
      <SeoOptimization title={"Business Status"} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateBusinessStatus clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
