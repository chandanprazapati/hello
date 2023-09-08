import React from "react";

const DownloadButton = ({ icon, title }) => {
  return (
    <div className="flex justify-end pt-3 ">
      <div className="flex gap-2 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer ">
        <div className="pt-1">{icon}</div>
        <button  className="text-sm font-extralight ">
          {title}
        </button>
      </div>
    </div>
  );
};

export default DownloadButton;
