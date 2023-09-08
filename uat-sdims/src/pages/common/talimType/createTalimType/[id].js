import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { talimType } from "../../../../services/apiServices/common/talimType/talimTypeService";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";

const CreateTalimType = dynamic(
  () => import("../../../../components/common/talimType/CreateTalimType"),
  { ssr: false }
);
export default function CreateTalimTypeId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await talimType();
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
      <SeoOptimization title={"Talim Type"} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateTalimType clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
