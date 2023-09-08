import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { previousOffice } from "../../../../services/apiServices/pis/previousOfficeRecord/prerviosOfficeRecordService";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
const CreatePreviousOfficeRecord = dynamic(
  () =>
    import("../../../../components/pis/previousOffice/CreatePreviousOffice"),
  { ssr: false }
);
export default function CreateSubDepartmentId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await previousOffice();
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
      <SeoOptimization title={"Previous Office Record"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreatePreviousOfficeRecord clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
