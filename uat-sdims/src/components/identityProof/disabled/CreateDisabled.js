import { useEffect, useState } from "react";
import { UseContextProvider } from "../../reusableDesign/contexts/StepperContext";
import AddressDetail from "../../identityProof/formFields/AddressDetail";
import FinalConfirmation from "../../identityProof/formFields/FinalConfirmation";
import Stepper from "../../reusableDesign/stepper/Stepper";
import PersonalDetails from "../../identityProof/formFields/PersonalDetails";
import SarakxanDetails from "../../../components/identityProof/formFields/SarakxanDetails";
import FormDetailCard from "./card/FormDetailCard";
import ApangataDetails from "../formFields/ApangataDetail";
import SifarishDetail from "../formFields/SirarishDetail";
import OtherDetails from "../formFields/OtherDetails";
import ListHeader from "../../reusableDesign/ListHeader";
export default function CreateDisabled() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});
  //   console.log(userData, "userData");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setUserData(data);
  }, [currentStep]);

  const steps = [
    "व्यक्तिगत विवरण",
    "ठेगाना",
    "संरक्षकको विवरण",
    "अपाङ्गता विवरण",
    "सिफारिस/प्रमाणित",
    "अन्य",
    "अन्तिम पुष्टि",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        );
      case 2:
        return (
          <AddressDetail
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        );
      case 3:
        return (
          <SarakxanDetails
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        );
      case 4:
        return (
          <ApangataDetails
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        );
      case 5:
        return (
          <SifarishDetail
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        );

      case 6:
        return (
          <OtherDetails
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        );
      case 7:
        return (
          <FinalConfirmation
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        );
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <div
      className={`${
        userData
          ? "mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-full pt-4 "
          : "mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-full pt-4 "
      }`}
    >
      {/* form display part start */}
      <div className="w-full mx-auto rounded-2xl bg-gray-200 pb-2 shadow-xl">
        {/* Stepper */}
        <div className="horizontal container mt-5 mb-10">
          <ListHeader title="अपाङ्गता दर्ता फारम " />
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="my-10 p-10 ">
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
        </div>
      </div>
      {/* form display part end */}
      {/* next component start */}
      {/* {
                userData && (
                    <div className="w-full mx-auto rounded-2xl bg-gray-200 pb-2 shadow-xl">
                        <FormDetailCard currentStep={currentStep} />
                    </div>
                )
            } */}
      {/* next component end */}
    </div>
  );
}
