import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { invoiceCancelReason } from "../../../../services/apiServices/revenue/invoiceCancelReason/invoceCancelReasonService";
const CreateInvoiceCancelReason = dynamic(
  () =>
    import(
      "../../../../components/revenue/invoiceCancelReason/CreateInvoiceCancelReason"
    ),
  { ssr: false }
);

export default function CreateAppointmentId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await invoiceCancelReason();
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
      <SeoOptimization title={"Invoice Cancel Reason"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateInvoiceCancelReason clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
