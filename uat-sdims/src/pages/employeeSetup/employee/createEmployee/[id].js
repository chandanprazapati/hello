import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import {  employeeGetById } from "../../../../services/apiServices/employee/employeesetup/employeeService";

const CreateEmployee = dynamic(
  () => import("../../../../components/employeeMaster/employee/CreateEmployee"),
  { ssr: false }
);

export default function CreateEmployeeId() {
  const [filteredData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();
  const userId = query?.id;

  console.log("userId", userId);

  useEffect(() => {
    const fetchData = async () => {
     if (userId){
      try {
        const { status, data, message } = await employeeGetById(userId);
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
     }
    };

    fetchData();
  }, [userId]);

  // const filteredData = useMemo(
  //   () => apiData.find((item) => item.id === parseInt(query.id)),
  //   [apiData, query.id]
  // );

  return (
    <>
      <SeoOptimization title="Employee" />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CreateEmployee key={query.id} clickedIdData={filteredData} />
      )}
    </>
  );
}
