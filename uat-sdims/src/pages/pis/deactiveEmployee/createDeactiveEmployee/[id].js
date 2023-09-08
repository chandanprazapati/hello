import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { deactiveEmployee } from "../../../../services/apiServices/pis/deactiveEmployee/deactiveEmployeeService";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
const CreateDeactiveEmployee = dynamic(
  () =>
    import(
      "../../../../components/pis/deactiveEmployee/CreateDeactiveEmployee"
    ),
  { ssr: false }
);
export default function DeactiveEmployeeId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await deactiveEmployee();
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
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateDeactiveEmployee clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
