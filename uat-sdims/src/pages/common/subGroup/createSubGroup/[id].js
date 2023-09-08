import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { subGroup } from "../../../../services/apiServices/common/subGroup/subGroupService";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";

const CreateSubGroup = dynamic(
  () => import("../../../../components/common/subGroup/CreateSubGroup"),
  { ssr: false }
);

export default function CreateSubGroupId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await subGroup();
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
      <SeoOptimization title={"Sub-Group"} />

      {loading ? (
        <LoadingSpinner/>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateSubGroup clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
