import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { fiscal } from "../../../../services/apiServices/common/fiscal/fiscalService";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";

const CreateFiscal = dynamic(
  () => import("../../../../components/common/fiscal/CreateFiscal"),
  { ssr: false }
);

export default function CreateFiscalId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await fiscal();
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

  // for large data using memo is the best way to filter data
  const filteredData = useMemo(
    () => apiData.find((item) => item.id === parseInt(query.id)),
    [apiData, query.id]
  );

  // if th data is small then we can use
  // const filteredData = apiData.find((item) => item.id === parseInt(query.fiscalid));

  return (
    <>
      <SeoOptimization title="Create Fiscal" />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateFiscal key={query.id} clickedIdData={filteredData} />
      )}
    </>
  );
}
