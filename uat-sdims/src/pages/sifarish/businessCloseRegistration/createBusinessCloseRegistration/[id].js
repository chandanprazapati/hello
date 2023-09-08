import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { getBusinessCloseFormUpdate } from "../../../../services/apiServices/sifarish/businessClose/businessClose";
import { toast } from "react-toastify";

const EditBusinessForm = dynamic(() => import("./index"), {
  ssr: false,
});

export default function CreateBusinessCLoseRegistrationId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!query.id) return;
      try {
        const { status, data, message } = await getBusinessCloseFormUpdate(
          query?.id
        );
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
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [query?.id]);

  return (
    <>
      <SeoOptimization title={"Business Close Registration"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <EditBusinessForm clickedIdData={apiData} />
      )}
    </>
  );
}
