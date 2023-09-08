import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { personDetailApi } from "../../../../../services/apiServices/legalCase/legalCaseService";
import SeoOptimization from "../../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../../components/reusableDesign/Loading";

const Index = dynamic(() => import("./"), {
  ssr: false,
});

export default function CreateNiyuktiPatraId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await personDetailApi();
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
      <SeoOptimization title={"नियुक्ति पत्र"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Index clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}

