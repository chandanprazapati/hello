import React from "react";

export default function ListViewPageDesign({ children}) {
  return (
    <div className="rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1 divide-black">
        {children}
    </div>
  );
}
