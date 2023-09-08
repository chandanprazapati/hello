import { Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import StepperControl from "../../reusableDesign/stepper/StepperControl";

export default function OtherDetails({ handleClick, currentStep, steps }) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*  rendering 1st part muti form start  from here */}
      <div className="bg-gray-300 py-3 rounded-xl flex justify-between px-4 ">
        <div className="  text-lg font-bold">१. रोग/औसधी</div>
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
      <FormControlLabel
        className=" px-4 py-1  "
        {...register("status")}
        control={
          <Checkbox
            // defaultChecked={clickedIdData?.status}
            color="primary"
          />
        }
        label=" रोग भए/नभएको ?"
      />

      {aidingInstrumental.map((item, index) => {
        return (
          <div className="flex " key={index} >
            <div className="flex">
              <input
                type="string"
                className="border-2 border-gray-300 p-2 rounded-lg m-2 w-96"
                name="whyInstrumentUsed"
                value={item.whyInstrumentUsed}
                onChange={(e) => handleAidingInstrumentalChange(e, index)}
                placeholder="संक्रमित रोगको  नाम "
              />

              <input
                type="string"
                className="border-2 border-gray-300 p-2 rounded-lg m-2 w-96"
                name="whyInstrumentUsed"
                value={item.whyInstrumentUsed}
                onChange={(e) => handleAidingInstrumentalChange(e, index)}
                placeholder="प्रायोग गरिरहेको औसधिको नाम "
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

      {/* rending part of 1st form end here */}

      {/*  rendering 2nd part muti form start  from here */}
      <div className="bg-gray-300 py-3 rounded-xl flex justify-between px-4 ">
        <div className="  text-lg font-bold">२. उपलब्ध छुट/सुविधाहरु</div>
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
      <text className="pl-4  font-bold ">उपलब्ध छुट/सुविधाहरु</text>
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

      {/* rendering 3rd part start */}

      <div className="bg-gray-300 py-3 rounded-xl flex justify-between px-4 ">
        <div className="  text-lg font-bold">३. हेरचाह केन्द्र</div>
      </div>
      <FormControlLabel
        className=" px-4 py-1  "
        {...register("status")}
        control={
          <Checkbox
            // defaultChecked={clickedIdData?.status}
            color="primary"
          />
        }
        label=" हेरचाह केन्द्रमा भएको/नभएको ?"
      />

      <div className="flex flex-col gap-2">
        <TextareaAutosize
          type="string"
          className="border-2 w-full pb-6 border-black"
          {...register("remarks")}
          placeholder="हेरचाह केन्द्रमा भए सो को विवरण ............"
        />
      </div>

      {/* rendering 3rd part end */}

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
