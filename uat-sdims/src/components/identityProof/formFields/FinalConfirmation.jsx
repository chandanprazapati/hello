import React, { useContext } from "react";
import { useRouter } from "next/router";
import { StepperContext } from "../../reusableDesign/contexts/StepperContext";

const FinalConfirmation = () => {
  const router = useRouter();
  console.log(router.pathname, "from the final confirmation");
  const { userData, setUserData } = useContext(StepperContext);
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-green-500">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Your form has been submitted successfully.
        </div>

{router.pathname === "/identityProof/disabled/createDisabled" ? (
  <a className="mt-10 space-x-8 ">
  <button
    onClick={() => {
      router.push("/identityProof/disabled");
    }}
    className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100"
  >
    View Applicants List
  </button>
  <button
    onClick={() => {
      router.push("/dashboard");
    }}
    className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100"
  >
    Close
  </button>
</a>):(

<a className="mt-10 space-x-8 ">
<button
  onClick={() => {
    router.push("/identityProof/seniorCitizen");
  }}
  className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100"
>
  View Applicants List
</button>
<button
  onClick={() => {
    router.push("/dashboard");
  }}
  className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100"
>
  Close
</button>
</a>
)
}

        
      </div>
    </div>
  );
};

export default FinalConfirmation;
