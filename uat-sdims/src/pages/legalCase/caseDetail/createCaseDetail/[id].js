import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { editCase} from "../../../../services/apiServices/legalCase/legalCaseService";

const CreateCaeDetail = dynamic(() => import("./"), { ssr: false });

export default function CreateCaseDetailId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!query.id) return;
      try {
        const { status, data, message } = await editCase( query.id );
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
  }, [ query.id]);
  return (
    <React.Fragment>
      <SeoOptimization title={"Create Case Detail"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateCaeDetail clickedIdData={apiData} />
      )}
    </React.Fragment>
  );
}
