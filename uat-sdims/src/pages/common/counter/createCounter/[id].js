import React, { useEffect, useState ,useMemo} from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { counter } from "../../../../services/apiServices/common/counter/counterService";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";

const CreateCounter = dynamic(
  () => import("../../../../components/common/counter/CreateCounter"),
  { ssr: false }
);

export default function CreateCounterId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await counter();
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
      <SeoOptimization title={"Ward"} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateCounter clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
