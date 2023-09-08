import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import CreateTaxPayerDetail from "../../../../components/revenue/controllers/taxPayerDeatil/CreateTaxPayerDetail";
import { taxPayerDetail } from "../../../../services/apiServices/revenue/taxPayerDetail/taxPayerDetailService";
export default function CreateTaxPayerDetailId() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let taxPayerDetailApiData = () => {
      taxPayerDetail().then((response) => {
        try {
          response.status === true;
          {
            setApiData(response.data);
            setLoading(false);
          }
        } catch (error) {
          toast.error(response.message, {
            autoClose: 1000,
          });
        }
      });
    };
    taxPayerDetailApiData();
  }, []);

  let filteredData = apiData.find(
    (item) => item.id === parseInt(query.taxpayerdetailid)
  );

  return (
    <React.Fragment>
      <SeoOptimization title={"Create Tax Payer Detail"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateTaxPayerDetail clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
}
