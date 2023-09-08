import React from "react";

export default function CardStats({ statSubtitle, statTitle }) {
  return (
    <>
      <div className=" bg-blue-300 rounded  shadow-lg lg:w-4/12 lg:h-[10vh] px-4 ">
        <div className="flex justify-between ">
          <div className=" uppercase font-bold pt-6">  {statSubtitle}</div>
          <div className="font-semibold text-xl pt-6 ">{statTitle}</div>
        </div>
      </div>
    </>
  );
}
