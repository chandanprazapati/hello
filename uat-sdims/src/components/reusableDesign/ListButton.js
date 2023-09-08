import React from "react";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
export default function ListButton({ url }) {
  const router = useRouter();
  return (
    <React.Fragment>
      <div className="flex justify-end">
        {/* <div>
        <BreadCumb/>
        </div> */}
        <div
          onClick={() => {
            router.push(url);
          }}
          className="flex gap-2 bg-[#89bde1fd] py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer"
        >
          <div className="pt-1">
            <FaPlus />
          </div>
          <button type="submit" className="text-sm font-extralight">
            नयाँ थप्नुहोस्
          </button>
        </div>
      </div>
      <hr className="mt-3" />
      <br />
    </React.Fragment>
  );
}
