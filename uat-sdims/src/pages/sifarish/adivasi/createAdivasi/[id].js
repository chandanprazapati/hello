import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import {  updateAadibasiJanjati } from "../../../../services/apiServices/sifarish/aadiwasiJanajaati/aadiwasiJanjatiService";

const CreateAadivasi = dynamic(() => import("../createAdivasi/index"), {
  ssr: false,
});

export default function CreateAadivasiId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!query.id) return;
      try {
        const { status, data, message } = await updateAadibasiJanjati(query.id);
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
  }, [ query.id ]);


  return (
    <React.Fragment>
      <SeoOptimization title={"Aawabihawit"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateAadivasi clickedIdData={apiData} />
      )}
    </React.Fragment>
  );
}
