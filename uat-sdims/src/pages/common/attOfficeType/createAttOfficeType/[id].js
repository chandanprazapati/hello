import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { attOfficeType } from "../../../../services/apiServices/common/attOfficeType/attOfficeTypeService";
const CreateAttOfficeType = dynamic(
  () =>
    import("../../../../components/common/attOfficeType/CreateAttOfficeType"),
  { ssr: false }
);

export default function CreateAttOfficeTypeId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await attOfficeType();
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
    <>
      <SeoOptimization title="Create Attendance Office Type" />

      {loading ? (
        <LoadingSpinner/>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateAttOfficeType key={query.id} clickedIdData={filteredData} />
      )}
    </>
  );
}
