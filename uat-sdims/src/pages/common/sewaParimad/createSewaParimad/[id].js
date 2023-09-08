import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import CreateSewaParimad from "../../../../components/common/sewaParimad/CreateSewaParimad";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { sewaParimad } from "../../../../services/apiServices/common/sewaParimad/sewaParimad";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";

export default function CreateSewaParimadId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await sewaParimad();
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
      <SeoOptimization title={"Create Sewa Parimad"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateSewaParimad clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
