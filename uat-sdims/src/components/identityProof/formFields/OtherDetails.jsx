import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import StepperControl from "../../reusableDesign/stepper/StepperControl";

export default function OtherDetails({handleClick,currentStep,steps}) {
  const { handleSubmit, register } = useForm({});

  const onSubmit = (data) => {
    handleClick("next");
  };

  // for why instrumenta used
  const [aidingInstrumental, setAidingInstrumental] = useState([
    {
      whyInstrumentUsed: "",
    },
  ]);
  const handleAddAidingInstumental = () => {
    setAidingInstrumental([
      ...aidingInstrumental,
      {
        whyInstrumentUsed: "",
      },
    ]);
  };

  const handleDeleteAidingInstumental = (index) => {
    const list = [...aidingInstrumental];
    list.splice(index, 1);
    setAidingInstrumental(list);
  };

  const handleAidingInstrumentalChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...aidingInstrumental];
    list[index][name] = value;
    setAidingInstrumental(list);
  };          

  // for ading instrumentUsing

  const [aidingInstrumentalUsing, setAidingInstrumentalUsing] = useState([
    {
      instrumentUsing: "",
    },
  ]);
  const handleAddAidingInstumentalUsing = () => {
    setAidingInstrumentalUsing([
      ...aidingInstrumentalUsing,
      {
        instrumentUsing: "",
      },
    ]);
  };

  const handleDeleteAidingInstumentalUsing = (index) => {
    const list = [...aidingInstrumentalUsing];
    list.splice(index, 1);
    setAidingInstrumentalUsing(list);
  };

  const handleAidingInstrumentalUsingChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...aidingInstrumentalUsing];
    list[index][name] = value;
    setAidingInstrumentalUsing(list);
  };

  // for workWithout Help

  const [disabledWorkWithoutHelp, setDisabledWorkWithoutHelp] = useState([
    {
      workWithoutHelp: "",
    },
  ]);
  const handleAddWorkWithoutHelp = () => {
    setDisabledWorkWithoutHelp([
      ...disabledWorkWithoutHelp,
      {
        workWithoutHelp: "",
      },
    ]);
  };

  const handleDeleteWorkWithoutHelp = (index) => {
    const list = [...disabledWorkWithoutHelp];
    list.splice(index, 1);
    setDisabledWorkWithoutHelp(list);
  };

  const handleWorkWithoutHelpChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...disabledWorkWithoutHelp];
    list[index][name] = value;
    setDisabledWorkWithoutHelp(list);
  };

   // for workWith Help

   const [disabledWorkWithHelp, setDisabledWorkWithHelp] = useState([
    {
      workWithHelp: "",
    },
  ]);
  const handleAddWorkWithHelp = () => {
    setDisabledWorkWithHelp([
      ...disabledWorkWithHelp,
      {
        workWithHelp: "",
      },
    ]);
  };

  const handleDeleteWorkWithHelp = (index) => {
    const list = [...disabledWorkWithHelp];
    list.splice(index, 1);
    setDisabledWorkWithHelp(list);
  };

  const handleWorkWithHelpChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...disabledWorkWithHelp];
    list[index][name] = value;
    setDisabledWorkWithHelp(list);
  };


  // for training

  const [disabledTraining, setDisabledTraining] = useState([
    {
      workWithHelp: "",
    },
  ]);
  const handleAddTraining= () => {
    setDisabledTraining([
      ...disabledTraining,
      {
        trainings: "",
      },
    ]);
  };

  const handleDeleteTraining = (index) => {
    const list = [...disabledTraining];
    list.splice(index, 1);
    setDisabledTraining(list);
  };

  const handleTrainingChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...disabledTraining];
    list[index][name] = value;
    setDisabledTraining(list);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*  rendering 1st part muti form start  from here */}
      <div className="bg-gray-300 py-3 rounded-xl flex justify-between px-4 ">
        <div className="  text-lg font-bold">
          १. आवस्यकता भएको सहायक सामग्रीको नाम
        </div>
        <div
          className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
          onClick={handleAddAidingInstumental}
        >
          <div className="flex  gap-2 ">
            <FaPlus size={20} />
            <text>थप्नुहोस्</text>
          </div>
        </div>
      </div>
      <text className="pl-4  font-bold ">
        आवस्यकता भएको सहायक सामग्रीको नाम
      </text>
      {aidingInstrumental.map((item, index) => {
        return (
          <div className="flex" key={index} >
            <div>
              <input
                type="string"
                className="border-2 border-gray-300 p-2 rounded-lg m-2 w-96"
                name="whyInstrumentUsed"
                value={item.whyInstrumentUsed}
                onChange={(e) => handleAidingInstrumentalChange(e, index)}
                placeholder="."
              />
            </div>

            <div>
              {aidingInstrumental.length > 1 && (
                <div className=" justify-end p-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                    onClick={() => handleDeleteAidingInstumental(index)}
                  >
                    Delete Form
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <FormControlLabel
        className=" px-4 py-1  "
        {...register("status")}
        control={
          <Checkbox
            // defaultChecked={clickedIdData?.status}
            color="primary"
          />
        }
        label="सहायक सामग्री प्रयोग गर्ने गरेको/नगरेको ?"
      />
      {/* rending part of 1st form end here */}

      {/*  rendering 2nd part muti form start  from here */}
      <div className="bg-gray-300 py-3 rounded-xl flex justify-between px-4 ">
        <div className="  text-lg font-bold">
          २. प्रयोग गर्ने गरेको सहायक सामग्रीको नाम
        </div>
        <div
          className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
          onClick={handleAddAidingInstumentalUsing}
        >
          <div className="flex  gap-2 ">
            <FaPlus size={20} />
            <text>थप्नुहोस्</text>
          </div>
        </div>
      </div>
      <text className="pl-4  font-bold ">
        प्रयोग गर्ने गरेको सहायक सामग्रीको नाम
      </text>
      {aidingInstrumentalUsing.map((item, index) => {
        return (
          <div className="flex" key={index} >
            <div>
              <input
                type="string"
                className="border-2 border-gray-300 p-2 rounded-lg m-2 w-96"
                name="instrumentUsing"
                value={item.instrumentUsing}
                onChange={(e) => handleAidingInstrumentalUsingChange(e, index)}
                placeholder="."
              />
            </div>

            <div>
              {aidingInstrumentalUsing.length > 1 && (
                <div className=" justify-end p-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                    onClick={() => handleDeleteAidingInstumentalUsing(index)}
                  >
                    Delete Form
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {/* rendering 2nd multi form end here */}

      {/*  rendering 3rd part muti form start  from here */}
      <div className="bg-gray-300 py-3 rounded-xl flex justify-between px-4 ">
        <div className="  text-lg font-bold">
          ३. अन्य व्यक्तिको सहयोग विना आफ्ना दैनिक कार्य
        </div>
        <div
          className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
          onClick={handleAddWorkWithoutHelp}
        >
          <div className="flex  gap-2 ">
            <FaPlus size={20} />
            <text>थप्नुहोस्</text>
          </div>
        </div>
      </div>
      <text className="pl-4  font-bold ">
        अन्य व्यक्तिको सहयोग विना आफ्ना कस्ता कस्ता दैनिक कार्य गर्न सक्नुहुन्छ
        ?
      </text>
      {disabledWorkWithoutHelp.map((item, index) => {
        return (
          <div className="flex" key={index} >
            <div>
              <input
                type="string"
                className="border-2 border-gray-300 p-2 rounded-lg m-2 w-96"
                name="workWithoutHelp"
                value={item.workWithoutHelp}
                onChange={(e) => handleWorkWithoutHelpChange(e, index)}
                placeholder="."
              />
            </div>

            <div>
              {disabledWorkWithoutHelp.length > 1 && (
                <div className=" justify-end p-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                    onClick={() => handleDeleteWorkWithoutHelp(index)}
                  >
                    Delete Form
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {/* rendering 3rd multi form end here */}

      {/*  rendering 4th part muti form start  from here */}
      <div className="bg-gray-300 py-3 rounded-xl flex justify-between px-4 ">
        <div className="  text-lg font-bold">
        ४. अन्य व्यक्तिको सहयोग लिनुहुन्छ भने कुन कुन कामका लागि
        </div>
        <div
          className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
          onClick={handleAddWorkWithHelp}
        >
          <div className="flex  gap-2 ">
            <FaPlus size={20} />
            <text>थप्नुहोस्</text>
          </div>
        </div>
      </div>
      <text className="pl-4  font-bold ">
      अन्य व्यक्तिको सहयोग लिनुहुन्छ भने कुन कुन कामका लागि लिनु हुन्छ ?
      </text>
      {disabledWorkWithHelp.map((item, index) => {
        return (
          <div className="flex" key={index} >
            <div>
              <input
                type="string"
                className="border-2 border-gray-300 p-2 rounded-lg m-2 w-96"
                name="workWithHelp"
                value={item.workWithHelp}
                onChange={(e) => handleWorkWithHelpChange(e, index)}
                placeholder="."
              />
            </div>

            <div>
              {disabledWorkWithHelp.length > 1 && (
                <div className=" justify-end p-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                    onClick={() => handleDeleteWorkWithHelp(index)}
                  >
                    Delete Form
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {/* rendering 4th multi form end here */}


       {/*  rendering 4th part muti form start  from here */}
       <div className="bg-gray-300 py-3 rounded-xl flex justify-between px-4 ">
        <div className="  text-lg font-bold">
        ५. कुनै तालिम प्राप्त गर्नुभएको भए
        </div>
        <div
          className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
          onClick={handleAddTraining}
        >
          <div className="flex  gap-2 ">
            <FaPlus size={20} />
            <text>थप्नुहोस्</text>
          </div>
        </div>
      </div>
      <text className="pl-4  font-bold ">
      कुनै तालिम प्राप्त गर्नुभएको भए मुख्य तालिमहरुको नाम
      </text>
      {disabledTraining.map((item, index) => {
        return (
          <div className="flex" key={index} >
            <div>
              <input
                type="string"
                className="border-2 border-gray-300 p-2 rounded-lg m-2 w-96"
                name="trainings"
                value={item.trainings}
                onChange={(e) => handleTrainingChange(e, index)}
                placeholder="."
              />
            </div>

            <div>
              {disabledTraining.length > 1 && (
                <div className=" justify-end p-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                    onClick={() => handleDeleteTraining(index)}
                  >
                    Delete Form
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {/* rendering 4th multi form end here */}

      <div className="mt-5">
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </form>
  );
}
