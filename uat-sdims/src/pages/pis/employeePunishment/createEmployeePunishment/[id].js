import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { employeePunishment } from "../../../../services/apiServices/pis/employeePunishment/employeePunishmentService";
const CreateEmployeePunishment = dynamic(
  () => import("../../../../components/pis/employeePunishment/CreateEmployeePunishment"),
  { ssr: false }
);
export default function EmployeePunishmentId() {
  const [apiData, setApiData] = useState([]);
  const { query } = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data, message } = await employeePunishment();
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
      <CreateEmployeePunishment clickedIdData={filteredData} />
    </React.Fragment>
  );
}
