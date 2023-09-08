import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { toast } from "react-toastify";
import { yenKanunApi } from "../../../../services/apiServices/legalCase/legalCaseService";

const CreateYenKanun = dynamic(() => import("./"), { ssr: false });

export default function CreateYenKanunId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await yenKanunApi();
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
      <SeoOptimization title="Yen Kanun" />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateYenKanun key={query.id} clickedIdData={filteredData} />
      )}
    </>
  );
}
