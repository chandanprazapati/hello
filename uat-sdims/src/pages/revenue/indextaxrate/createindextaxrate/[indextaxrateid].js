import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import { indexTaxRate } from "../../../../services/apiServices/revenue/indextaxrate/indextaxrateservice";
import dynamic from "next/dynamic";
const CreateTaxRate = dynamic(
  () =>
    import("../../../../components/revenue/controllers/taxRate/CreateTaxRate"),
  {
    ssr: false,
  }
);
export default function CreateIndexTaxrateById  ()  {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let indexTaxrateApiData = () => {
      indexTaxRate().then((response) => {
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
    indexTaxrateApiData();
  }, []);

  let filteredData = apiData.find(
    (item) => item.id === parseInt(query.indextaxrateid)
  );

  return (
    <React.Fragment>
      <SeoOptimization title={"Index tax rate"} />

      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <CreateTaxRate clickedIdData={filteredData} />
      )}
    </React.Fragment>
  );
};

