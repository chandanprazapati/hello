import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { sewalog } from "../../../../services/apiServices/pis/sewalog/sewalogService";
const CreateSewalog = dynamic(
  () => import("../../../../components/pis/sewalog/CreateSewalog"),
  { ssr: false }
);
export default function SewaLogId() {
  const [apiData, setApiData] = useState([]);
  const { query } = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await sewalog();
        if (status === true) {
          setApiData(data);
          setLoading(false);
        } else {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  const filteredData = useMemo(
    () => apiData.find((item) => item.id === parseInt(query.id)),
    [apiData, query.id]
  );

  return (
    <React.Fragment>
      <CreateSewalog clickedIdData={filteredData} />
    </React.Fragment>
  );
}
