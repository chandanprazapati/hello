import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { BusinessRegUpdate } from "../../../../services/apiServices/sifarish/businessRegistration/businessRegistrationService";
import { toast } from "react-toastify";

const CreateBusinessRegistration = dynamic(() => import("./"), {
  ssr: false,
});

export default function CreateBusinessRegistrationId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!query.id) return;
      try {
        const { status, data, message } = await BusinessRegUpdate(query.id);
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
  }, [query.id]);

  // const filteredData = useMemo(
  //   () => apiData.find((item) => item.id === parseInt(query.id)),
  //   [apiData, query.id]
  // );
  return (
    <React.Fragment>
      <SeoOptimization title={"Business Registration"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateBusinessRegistration clickedIdData={apiData} />
      )}
    </React.Fragment>
  );
}
