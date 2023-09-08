import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { punishment } from "../../../../services/apiServices/common/punishment/punishmentService";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
const CreatePunishment = dynamic(
  () => import("../../../../components/common/punishment/CreatePunishment"),
  { ssr: false }
);

export default function CreatePunishmentId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await punishment();
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
      <SeoOptimization title={"Punishment"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreatePunishment key={query.id} clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
