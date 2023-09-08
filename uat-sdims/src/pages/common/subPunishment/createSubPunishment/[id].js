import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { subPunishment } from "../../../../services/apiServices/common/subPunishment/subPunishmentService";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
const CreateSubPunishment = dynamic(
  () =>
    import("../../../../components/common/subPunishment/CreateSubPunishment"),
  { ssr: false }
);
export default function SubpunishmentId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await subPunishment();
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
      <SeoOptimization title={"Sub-Punishment"} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateSubPunishment clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
