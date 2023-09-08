import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { vehicleCloseReason } from "../../../../services/apiServices/revenue/vehicleCloseReason/vehicleCloseReasonService";

const CreateVehicleCloseReason = dynamic(
  () => import("../../../../components/revenue/vehicleCloseReason/CreateVehicleCloseReason"),
  { ssr: false }
);

export default function CreateVehicleCloseId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await vehicleCloseReason();
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
      <SeoOptimization title={"Vehicle Close Reason"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateVehicleCloseReason clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
