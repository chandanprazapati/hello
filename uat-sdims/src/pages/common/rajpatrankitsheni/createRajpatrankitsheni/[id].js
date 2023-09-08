import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { rajPatrankitSheni } from "../../../../services/apiServices/common/rajPatrankitSheni/rajPatrankitSheniService";
const CreateRajPatrankitSheni = dynamic(
  () =>
    import(
      "../../../../components/common/rajPatrankitSheni/CreateRajPatrankitSheni"
    ),
  { ssr: false }
);

export default function CreateWardId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await rajPatrankitSheni();
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
      <SeoOptimization title={"Create RajpatrankitsheniApiData"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateRajPatrankitSheni clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
