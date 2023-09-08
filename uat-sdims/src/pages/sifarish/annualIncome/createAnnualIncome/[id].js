import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { editAnnualIncome } from "../../../../services/apiServices/sifarish/annualIncome/annualIncomeService";
import { toast } from "react-toastify";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import dynamic from "next/dynamic";

const EditAnnualIncomeFile = dynamic(() => import("./index"), { ssr: false });

export default function IndexId() {
  const [apiData, setApiData] = useState([]);
  console.log(apiData, "dataaaadata");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();
  console.log(query, "query");

  useEffect(() => {
    const fetchData = async () => {
      if (!query.id) return;
      try {
        const { status, data, message } = await editAnnualIncome(query.id);
        if (status === true) {
          setApiData(data);
          setLoading(false);
        } else {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      } catch (error) {
        setError("An error occured while fetching");
      }
    };
    fetchData();
  }, [query.id]);
  return (
    <>
      <SeoOptimization title={"AnnualIncome"} />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <EditAnnualIncomeFile clickedIdData={apiData} />
      )}
    </>
  );
}
