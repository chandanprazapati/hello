import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {  sarakxanValidation } from "../../../utils/validateField";
import { StepperContext } from "../../reusableDesign/contexts/StepperContext";
import FormRender from "../../reusableDesign/form/FormRender";
import StepperControl from "../../reusableDesign/stepper/StepperControl";


const defaultValues = {
  guardianFullName_Eng: "",
  guardianFullName_Nep: "",
  relationAs: "",
  guardianAddress_Nep: "",
  guardianAddress_Eng: "",
  guardianContactNo: "",
};

const SarakxanDetails = ({ handleClick, currentStep, steps }) => {
  const { userData, setUserData } = useContext(StepperContext);
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: defaultValuesWithUserData,
    // resolver: sarakxanValidation,
  });

  useEffect(() => {
    if (userData) {
      setDefaultValuesWithUserData({
        guardianFullName_Eng: userData.guardianFullName_Eng || "",
        guardianFullName_Nep: userData.guardianFullName_Nep || "",
        relationAs: userData.relationAs || "",
        guardianAddress_Nep: userData.guardianAddress_Nep || "",
        guardianAddress_Eng: userData.guardianAddress_Eng || "",
        guardianContactNo: userData.guardianContactNo || "",
      });
    setValue("guardianFullName_Eng", userData.guardianFullName_Eng || "");
    setValue("guardianFullName_Nep", userData.guardianFullName_Nep || "");
    setValue("relationAs", userData.relationAs || defaultValues.relationAs);
    setValue("guardianAddress_Nep", userData.guardianAddress_Nep || "");
    setValue("guardianAddress_Eng", userData.guardianAddress_Eng || "");
    setValue("guardianContactNo", userData.guardianContactNo || "");

    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData,setValue]);

  const onSubmit = (data) => {
    setUserData({ ...userData, ...data });
    handleClick("next");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formField.map((formField) => {
        return (
          <Controller
            key={formField.name}
            control={control}
            name={formField.name}
            render={({ field: controllerField }) => {
              return (
                <FormRender
                  controllerField={controllerField}
                  formField={formField}
                  errors={errors}
                  isSubmitting={isSubmitting}
                />
              );
            }}
          />
        );
      })}
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
};

export default SarakxanDetails;



const formField = [
  {
    name: "guardianFullName_Eng",
    label: "पुरानाम,थर(अंग्रेजीमा)",
    type: "text",
    placeholder: "Enter your name in English",
  },
  {
    name: "guardianFullName_Nep",
    label: "पुरानाम,थर(नेपालीमा)",
    type: "text",
    placeholder: "Enter your name in Nepali",
  },

  {
    name: "relationAs",
    label: "नाता ",
    type: "select",
    defaultValue: "select your relationship",
    options: [
      
      {
        value: "Mother",
        label: "Mother",
      },
      {
        value: "Father",
        label: "Father",
      },
      {
        value: "Elder sister",
        label: "Elder sister",
      },
      {
        value: "Younger sister",
        label: "Younger sister",
      },
      {
        value: "Uncle",
        label: "Uncle",
      },
      {
        value: "Son",
        label: "Son",
      },
      {
        value: "Daughter",
        label: "Daughter",
      },
    ],
  },
  {
    name: "guardianAddress_Nep",
    label: "सम्पर्क ठेगाना(नेपालीमा)",
    type: "text",
    placeholder: "Enter your addres in nepali",
  },
  {
    name: "guardianAddress_Eng",
    label: "सम्पर्क ठेगाना(अंग्रेजीमा)",
    type: "text",
    placeholder: "Enter your addres in English",
  },
  {
    name: "guardianContactNo",
    label: "सम्पर्क नं",
    type: "number",
    placeholder: "Enter your phone number",
  },
];