import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { padPurtiType } from "../../../../services/apiServices/common/padPurtiType/padPurtiTypeService";
const CreatePadPurti = dynamic(
  () => import("../../../../components/common/padPurtiType/CreatePadPurtiType"),
  { ssr: false }
);
export default function CreatePadPurtiTypeId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await padPurtiType();
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
      <SeoOptimization title={"PadPurti"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreatePadPurti key={query.id} clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
