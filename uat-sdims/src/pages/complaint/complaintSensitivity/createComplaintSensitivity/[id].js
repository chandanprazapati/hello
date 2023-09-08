import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { complaintSensitivityService } from "../../../../services/apiServices/complaint/complaintSensitivity/complaintSensitivityService";
const CreateComplaintSensitivity = dynamic(
  () => import("../../../../components/complaint/complaintSensitivity/CreateComplaintSensitivity"),
  { ssr: false }
);
const CreateComplaintSensitivityId = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await complaintSensitivityService();
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
      <SeoOptimization title={"ComplaintSensitivity"} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CreateComplaintSensitivity key={query.id} clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
};

export default CreateComplaintSensitivityId;
