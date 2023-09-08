import React from "react";
import HeaderStats from "./headerStats/HeaderStats";
import PieChart from "./chart/PieChart";
const Dashboard = () => {
  return (
    <div>
      {/* revene chart starts from here */}
      <div className="py-4 shadow-2xl rounded-2xl ">
        <div  >
          <HeaderStats.RevenueHeaderStats />
        </div>
        <div className="flex justify-around pt-10 px-4">
          <div className=" mb-12 xl:mb-0   ">
            <PieChart.RevenuePieChart />
          </div>
          <div className="px-4 mb-12 xl:mb-0 ">
            <PieChart.RevenueWadaPieChart />
          </div>
        </div>
      </div>
      {/* revene chart ends here */}

      {/* sifarish chart starts from here */}
      <div className="py-4 shadow-2xl rounded-2xl ">
        <div>
          <HeaderStats.SifarishHeaderStats />
        </div>
        <div className="pt-10">
          <div className=" mb-12 xl:mb-0 px-4">
            <PieChart.SifarishPieChart />
          </div>
          {/* <div className="px-4 mb-12 xl:mb-0 ">
            <PieChart.RevenueWadaPieChart />
          </div> */}
        </div>
      </div>
      {/* sifarish chart ends here */}

      {/* planning header starts from here */}
      <div className="py-4 shadow-2xl rounded-2xl ">
        <div>
          <HeaderStats.PlanningHeaderStats />
        </div>
        <div className="flex justify-around pt-10">
          <div className=" mb-12 xl:mb-0 px-4">
            <PieChart.PlanningPieChart />
          </div>
          <div className="px-4 mb-12 xl:mb-0 ">
            <PieChart.PlanningWadaPieChart />
          </div>
        </div>
      </div>

      {/* planning header ends here */}
    </div>
  );
};

export default Dashboard;
