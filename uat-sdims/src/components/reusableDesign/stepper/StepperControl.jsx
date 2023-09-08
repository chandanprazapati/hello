import React from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="container flex justify-around mb-8">
      {/* back button */}
      <button
        onClick={() => handleClick()}
        className={`bg-gray-400 text-black uppercase py-2 px-4 rounded-xl font-semibold cursor-pinter boder-2 border-slate-500  hover:bg-slate-700 hover:text-white transition  duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        } `}
      >
        Back
      </button>
      {/* next button */}
      <button
        // onClick={() => handleClick("next")}
        className="bg-slate-700 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pinter boder-2 border-slate-300  hover:bg-slate-700 hover:text-white transition  duration-200 ease-in-out"
      >
        {currentStep === steps.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
