import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import FormRender from "../../reusableDesign/form/FormRender";
import StepperControl from "../../reusableDesign/stepper/StepperControl";
import { StepperContext } from "../../reusableDesign/contexts/StepperContext";

export default function SifarishDetail({ handleClick, currentStep, steps }) {
  const { userData, setUserData } = useContext(StepperContext);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

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
}

const formField = [
  {
    name: "sifarishName",
    label: "सिफारिस गर्ने व्यक्तिको नाम",
    type: "text",
    placeholder: "सिफारिस गर्ने व्यक्तिको नाम",
  },
  {
    name: "pramanitName",
    label: "प्रमाणित गर्ने व्यक्तिको नाम",
    type: "text",
    placeholder: "प्रमाणित गर्ने व्यक्तिको नाम",
  },
];
