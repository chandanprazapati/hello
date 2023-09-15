import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { appointment } from "../../../../services/apiServices/common/appointment/appointmentService";
import { toast } from "react-toastify";
import { twoNameOnePersonDetailsUpdate } from "../../../../services/apiServices/sifarish/twoNameOnePerson/twoNameOnePersonService";

const CreateTwoNameOnePerson = dynamic(() => import("./index"), {
  ssr: false,
});

export default function CreateTwoNameOnePersonId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!query.id) return;
      try {
        const { status, data, message } = await twoNameOnePersonDetailsUpdate(
          query.id
        );
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
      <SeoOptimization title={"Two Name One Person  "} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateTwoNameOnePerson clickedIdData={apiData} />
      )}
    </React.Fragment>
  );
}
