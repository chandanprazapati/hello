import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { personalInformationValidation } from "../../../utils/validateField";
import StepperControl from "../../reusableDesign/stepper/StepperControl";
import FormRender from "../../reusableDesign/form/FormRender";
import { StepperContext } from "../../reusableDesign/contexts/StepperContext";
import { Checkbox, FormControlLabel } from "@mui/material";

const defaultValues = {
  fullName_Eng: "",
  fullName_Nep: "",
  mobileNo: "",
  citznshipNo: "",
  age: "",
  education: "",
  occupation: "",
  bloodGroup: "",
};

const ApangataDetails = ({ handleClick, currentStep, steps }) => {
  const { userData, setUserData } = useContext(StepperContext);
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: defaultValuesWithUserData,
  });

  useEffect(() => {
    if (userData) {
      setDefaultValuesWithUserData({
        fullName_Eng: userData.fullName_Eng || "",
        fullName_Nep: userData.fullName_Nep || "",
        mobileNo: userData.mobileNo || "",
        citznshipNo: userData.citznshipNo || "",
        age: userData.age || "",
        gender: userData.gender || "",
        education: userData.education || "",
        occupation: userData.occupation || "",
        bloodGroup: userData.bloodGroup || "",
      });
      setValue("fullName_Eng", userData.fullName_Eng || ""); // pass setValue to the dependencies array and use it directly
      setValue("fullName_Nep", userData.fullName_Nep || "");
      setValue("mobileNo", userData.mobileNo || "");
      setValue("citznshipNo", userData.citznshipNo || "");
      setValue("age", userData.age || "");
      setValue("gender", userData.gender || defaultValues.gender);
      setValue("education", userData.education || defaultValues.education);
      setValue("occupation", userData.occupation || defaultValues.occupation);
      setValue("bloodGroup", userData.bloodGroup || defaultValues.bloodGroup);
    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData,setValue]);

  const onSubmit = (data) => {
    setUserData({ ...userData, ...data });
    localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
    handleClick("next");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {formField?.map((formField) => {
          return (
            <Controller
              key={formField.name}
              name={formField.name}
              control={control}
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
        <FormControlLabel
       
        {...register("status")}
        control={
          <Checkbox
            // defaultChecked={clickedIdData?.status}
            color="primary"
          />
        }
        label="सहायक सामग्री प्रयोग गर्नु पर्ने आवस्यकता भएको वा नभएको ?"
      />

     
      </div>
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

export default ApangataDetails;

const formField = [
  {
    name: "fullName_Eng",
    label: "वर्ग ",
    type: "select",
    defaultValue: "Select Your Class",
    options: [
      {
        value: "पूर्ण अशक्त अपाङ्गता",
        label: "पूर्ण अशक्त अपाङ्गता",
      },
      {
        value: "सामान्य अपाङ्गता",
        label: "सामान्य अपाङ्गता",
      },
      {
        value: "अंशक्त अपाङ्गता",
        label: "अंशक्त अपाङ्गता",
      },
      {
        value: "अन्य",
        label: "अन्य",
      },
    ],
  },
  {
    name: "fullName_Nep",
    label: "कारण",
    type: "select",
    defaultValue: "Select Your Reason",
    options: [
      {
        value: "दृष्टिहीनता",
        label: "दृष्टिहीनता",
      },
      {
        value: "श्रवणहीनता",
        label: "श्रवणहीनता",
      },
      {
        value: "अंगहीनता",
        label: "अंगहीनता",
      },
      {
        value: "अन्य",
        label: "अन्य",
      },
    ],
  },

  {
    name: "gender",
    label: "प्रकृति",
    type: "select",
    defaultValue: "Select your diability type ",
    options: [
     
      {
        value: "पुरुष",
        label: "पुरुष",
      },
      {
        value: "महिला",
        label: "महिला",
      },
      {
        value: "अन्य",
        label: "अन्य",
      },
    ],
  },
  {
    name: "age",
    label: "Description",
    type: "text",
    placeholder: "Enter your Age",
  },
  {
    name: "mobileNo",
    label: "Activity Limit Desription",
    type: "text",
    placeholder: "Enter  Activity Limit Desription",
  },
  
  {
    name: "education",
    label: "गाम्भीर्यता",
    type: "select",
    defaultValue: "Select disability condition",
    options: [
     
      {
        value: "सामान्य",
        label: "सामान्य",
      },
      {
        value: "पुर्ण",
        label: "पुर्ण",
      },
    ],
  },
  
];
