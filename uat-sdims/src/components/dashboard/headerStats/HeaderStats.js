import React, { useEffect } from "react";
import CardStats from "../cardStat/CardStats";
import { indexRevenue } from "../../../services/apiServices/dashboard/revenue/revenueServices";
import { indexSifarish } from "../../../services/apiServices/dashboard/sifarish/sifarishServices";
import { indexPlanning } from "../../../services/apiServices/dashboard/planning/planningService";
// revenue header stats
const RevenueHeaderStats = () => {
  const [apiData, setApiData] = React.useState([]);
  useEffect(() => {
    const fetchedData = () => {
      indexRevenue().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data.topList);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiData]);
  return (
    <div className="flex bg-blue-500  gap-2 px-4 py-10  ">
      {apiData.map((items, index) => {
        return (
          <>
            <CardStats
              key={index}
              statSubtitle={items.name}
              statTitle={items.amount}
            />
          </>
        );
      })}
    </div>
  );
};
// sifarsh header stats
const SifarishHeaderStats = () => {
  const [apiData, setApiData] = React.useState([]);
  useEffect(() => {
    const fetchedData = () => {
      indexSifarish().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data.noticeList);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiData]);
  return (
    <div className="flex bg-blue-500 gap-2 px-4 py-10  ">
      {apiData.map((items, index) => {
        return (
          <>
            <CardStats
              key={index}
              statSubtitle={items.name}
              statTitle={items.count}
            />
          </>
        );
      })}
    </div>
  );
};

// planning header stats
const PlanningHeaderStats = () => {
  const [apiData, setApiData] = React.useState([]);
  useEffect(() => {
    const fetchedData = () => {
      indexPlanning().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiData]);
  return (
    <div className="flex lg:grid-cols-3 bg-blue-500 gap-2 px-4 py-10  ">
     
      <div className=" bg-blue-300 rounded  shadow-lg lg:w-4/12 lg:h-[10vh] px-4 ">
        <div className="flex justify-between ">
          <div className=" uppercase font-bold pt-6"> सम्झौता भएको योजना</div>
          <div className="font-semibold text-xl pt-6 ">
            {apiData.samjhautaNavayekaYojanaCount}
          </div>
        </div>
      </div>

      <div className=" bg-blue-300 rounded  shadow-lg lg:w-4/12 lg:h-[10vh] px-4 ">
        <div className="flex justify-between ">
          <div className=" uppercase font-bold pt-6"> सम्झौता नभएको योजना </div>
          <div className="font-semibold text-xl pt-6 ">
            {apiData.samjhuataVayekaYojanaCount}
          </div>
        </div>
      </div>

      <div className=" bg-blue-300 rounded  shadow-lg lg:w-4/12 lg:h-[10vh] px-4 ">
        <div className="flex justify-between ">
          <div className=" uppercase font-bold pt-6">कुल योजना </div>
          <div className="font-semibold text-xl pt-6 ">
            {apiData.totalCount}
          </div>
        </div>
      </div>

      <div className=" bg-blue-300 rounded  shadow-lg lg:w-4/12 lg:h-[10vh] px-4 ">
        <div className="flex justify-between ">
          <div className=" uppercase font-bold pt-6">जम्मा समिति </div>
          <div className="font-semibold text-xl pt-6 ">
            {apiData.samitiCount}
          </div>
        </div>
      </div>

      <div className=" bg-blue-300 rounded  shadow-lg lg:w-4/12 lg:h-[10vh] px-4 ">
        <div className="flex justify-between ">
          <div className=" uppercase font-bold pt-6">जम्मा टोल विकाश  </div>
          <div className="font-semibold text-xl pt-6 ">
            {apiData.tolBikashCount}
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { RevenueHeaderStats, SifarishHeaderStats, PlanningHeaderStats };
