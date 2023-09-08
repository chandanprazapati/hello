import React, { useEffect, useState } from 'react'
import { office } from '../../services/apiServices/common/office/officeService';



export default function PlanningHeaderReport() {

    // to set the office data
    const [apiDataOffice, setApiDataOffice] = useState([]);

    useEffect(() => {
      const fetchedData = () => {
        office().then(({ status, data, message }) => {
          try {
            if (status) {
              setApiDataOffice(data);
            }
          } catch (error) {
            toast.error(message, {
              autoClose: 1000,
            });
          }
        });
      };
      fetchedData();
    }, [setApiDataOffice]);

  return (
    <div>
      {apiDataOffice?.map((items, index) => {
                  return (
                    <div key={index}>
                      <div className="text-2xl font-extrabold">
                        {items?.palikaName}
                      </div>
                      <div className="text-xl font-bold text-center ">
                        {items.name_En}
                      </div>
                      <div className="text-center">{items?.name}</div>

                      <div className="text-center">{items.address}</div>
                      <div className="text-center">
                        {items.stateName}, प्रदेश{" "}
                      </div>
                    </div>
                  );
                })} 
    </div>
  )
}
