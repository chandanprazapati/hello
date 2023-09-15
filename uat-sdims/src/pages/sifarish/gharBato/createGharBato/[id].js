import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { toast } from "react-toastify";
import { updateGharBatoPramanit } from "../../../../services/apiServices/sifarish/gharBatoPramanit/gharBatoPramanitService";

const CreateGharBato = dynamic(() => import("./index"), {
  ssr: false,
});

export default function CreateGharBatoId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!query.id) return;
      try {
        const { status, data, message } = await updateGharBatoPramanit(
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
        setError("An error occurred while fetching ghar bato data.");
      }
    };

    fetchData();
  }, [query?.id]);

  return (
    <React.Fragment>
      <SeoOptimization title={"Ghar Bato"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateGharBato clickedIdData={apiData} />
      )}
    </React.Fragment>
  );
}
