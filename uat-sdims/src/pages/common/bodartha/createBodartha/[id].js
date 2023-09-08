import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { bodartha } from "../../../../services/apiServices/common/bodartha/bodarthaService";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

const CreateBodartha = dynamic(
  () => import("../../../../components/common/bodartha/CreateBodartha"),
  { ssr: false }
);

export default function BodarthaById() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  const filteredData = useMemo(
    () => apiData.find((item) => item.id === parseInt(query.id)),
    [apiData, query.id]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await bodartha();
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
  return (
    <React.Fragment>
      <SeoOptimization title={"Bodartha"} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateBodartha key={query.id} clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
