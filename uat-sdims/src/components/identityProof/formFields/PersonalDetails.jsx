import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { personalInformationValidation } from "../../../utils/validateField";
import StepperControl from "../../reusableDesign/stepper/StepperControl";
import FormRender from "../../reusableDesign/form/FormRender";
import { StepperContext } from "../../reusableDesign/contexts/StepperContext";
import { getDistrict } from "../../../services/apiServices/common/office/officeService";

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

const PersonalDetails = ({ handleClick, currentStep, steps }) => {
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
    // resolver: personalInformationValidation,
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

  // for district
  const [district, setDistrict] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getDistrict();
        if (status) {
          setDistrict(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const districtOptions = district?.map((item) => {
    return (
      <option value={item.districtId} key={item.districtId}>
        {item.districtNameNep}
      </option>
    );
  });

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
};

export default PersonalDetails;

const formField = [
  {
    name: "fullName_Eng",
    label: "पुरानाम,थर(अंग्रेजीमा) ",
    type: "text",
    placeholder: "Enter your name in Nepali",
  },
  {
    name: "fullName_Nep",
    label: "पुरानाम,थर(नेपालीमा)",
    type: "text",
    placeholder: "Enter your name in English",
  },
  {
    name: "gender",
    label: "लिङ्ग",
    type: "select",
    
    defaultValue: "Select Your Gender",
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
    label: "उमेर",
    type: "number",
    placeholder: "Enter your Age",
  },
  {
    name: "mobileNo",
    label: "मोबाइल नं.",
    type: "number",
    placeholder: "Enter your mobile number",
  },
  {
    name: "citznshipNo",
    label: "ना.प्र.प.नं / ज.द.नं",
    type: "text",
    placeholder: "Enter your citizenship number",
  },
  {
    name: "education",
    label: "शिक्षा स्थर",
    type: "select",
    defaultValue: "Select your education level",
    
    options: [
      {
        value: "प्राथमिक तह",
        label: "प्राथमिक तह",
      },
      {
        value: "निम्न माध्यमिक तह",
        label: "निम्न माध्यमिक तह",
      },
      {
        value: "माध्यमिक तह",
        label: "माध्यमिक तह",
      },
      {
        value: "उच्च माध्यमिक तह",
        label: "उच्च माध्यमिक तह",
      },
      {
        value: "स्नातक तह",
        label: "स्नातक तह",
      },
      {
        value: "स्नातकोत्तर तह",
        label: "स्नातकोत्तर तह",
      },

      {
        value: "विद्यावारिधि तह",
        label: "विद्यावारिधि तह",
      },
    ],
  },
  {
    name: "occupation",
    label: "पेशा",
    type: "select",
    defaultValue: "Select your occupation",
    options: [
      {
        value: "अध्ययन",
        label: "अध्ययन",
      },
      {
        value: "कृषी",
        label: "कृषी",
      },
      {
        value: "स्वरोजगार",
        label: "स्वरोजगार",
      },
      {
        value: "सरकारी सेवा",
        label: "सरकारी सेवा",
      },
      {
        value: "निजि क्षेत्रमा सेवा",
        label: "निजि क्षेत्रमा सेवा",
      },

      {
        value: "केहि नगरेको",
        label: "केहि नगरेको",
      },
      {
        value: "अन्य",
        label: "अन्य",
      },
    ],
  },
  {
    name: "bloodGroup",
    label: "रक्त समूह",
    type: "select",
    defaultValue: "Select your blood group",
    options: [
      {
        value: "A+",
        label: "A+",
      },
      {
        value: "A-",
        label: "A-",
      },
      {
        value: "B+",
        label: "B+",
      },
      {
        value: "B-",
        label: "B-",
      },
      {
        value: "AB+",
        label: "AB+",
      },
      {
        value: "AB-",
        label: "AB-",
      },
      {
        value: "O+",
        label: "O+",
      },
      {
        value: "O-",
        label: "O-",
      },
    ],
  },
];
