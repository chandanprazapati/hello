import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";
import { addressValidation } from "../../../utils/validateField";
import FormRender from "../../reusableDesign/form/FormRender";
import StepperControl from "../../reusableDesign/stepper/StepperControl";
import { StepperContext } from "../../reusableDesign/contexts/StepperContext";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../services/apiServices/common/office/officeService";
import { ward } from "../../../services/apiServices/common/ward/wardService";

const permanentAddressField = [
  {
    name: "addressLine1",
    label: "प्रदेश",
    type: "select",
    placeholder: "select state",
    defaultValue: "Select Your State",
    options: [
     
      { value: "प्रदेश १", label: "प्रदेश १" },
      { value: "प्रदेश २", label: "प्रदेश २" },
      { value: "प्रदेश ३", label: "प्रदेश ३" },
      { value: "प्रदेश ४", label: "प्रदेश ४" },
      { value: "प्रदेश ५", label: "प्रदेश ५" },
      { value: "प्रदेश ६", label: "प्रदेश ६" },
      { value: "प्रदेश ७", label: "प्रदेश ७" },
    ],
  },
  {
    name: "addressLine2",
    label: "जिल्ला",
    type: "select",
    defaultValue: "Select Your District",
    options: [
      { value: "प्रदेश १", label: "प्रदेश १" },
      { value: "प्रदेश २", label: "प्रदेश २" },
      { value: "प्रदेश ३", label: "प्रदेश ३" },
      { value: "प्रदेश ४", label: "प्रदेश ४" },
      { value: "प्रदेश ५", label: "प्रदेश ५" },
      { value: "प्रदेश ६", label: "प्रदेश ६" },
      { value: "प्रदेश ७", label: "प्रदेश ७" },
    ],
  },
  {
    name: "city",
    label: "गा.पा/न पा",
    type: "select",
    defaultValue: "Select Your City",
    options: [
      { value: "प्रदेश १", label: "प्रदेश १" },
      { value: "प्रदेश २", label: "प्रदेश २" },
      { value: "प्रदेश ३", label: "प्रदेश ३" },
      { value: "प्रदेश ४", label: "प्रदेश ४" },
      { value: "प्रदेश ५", label: "प्रदेश ५" },
      { value: "प्रदेश ६", label: "प्रदेश ६" },
      { value: "प्रदेश ७", label: "प्रदेश ७" },
    ],
  },
  {
    name: "state",
    label: "वडा नं",
    type: "select",
    defaultValue: "Select Your State",
    options: [
      { value: "प्रदेश १", label: "प्रदेश १" },
      { value: "प्रदेश २", label: "प्रदेश २" },
      { value: "प्रदेश ३", label: "प्रदेश ३" },
      { value: "प्रदेश ४", label: "प्रदेश ४" },
      { value: "प्रदेश ५", label: "प्रदेश ५" },
      { value: "प्रदेश ६", label: "प्रदेश ६" },
      { value: "प्रदेश ७", label: "प्रदेश ७" },
    ],
  },
  {
    name: "permanentTole",
    label: "टोल",
    type: "text",
    placeholder: "Enter your tole name",
  },
];

const temporaryAddressField = [
  {
    name: "addressLine1",
    label: "प्रदेश",
    type: "text",
    placeholder: "Enter your address line 1",
  },
  {
    name: "addressLine2",
    label: "जिल्ला",
    type: "text",
    placeholder: "Enter your address line 2",
  },
  {
    name: "city",
    label: "गा.पा/न पा",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    name: "state",
    label: "वडा नं",
    type: "text",
    placeholder: "Enter your state",
  },
  {
    name: "temporaryTole",
    label: "टोल",
    type: "text",
    placeholder: "Enter your tole name",
  },
];

const defaultValues = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
};

const AddressDetail = ({ handleClick, currentStep, steps }) => {
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");
  const { userData, setUserData } = useContext(StepperContext);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: defaultValuesWithUserData,
    // resolver: addressValidation,
  });

  useEffect(() => {
    if (userData.addressLine1) {
      setDefaultValuesWithUserData({
        addressLine1: userData.addressLine1 || "",
        addressLine2: userData.addressLine2 || "",
        city: userData.city || "",
        state: userData.state || "",
        zipCode: userData.zipCode || "",
      });

      setValue("addressLine1", userData.addressLine1 || "");
      setValue("addressLine2", userData.addressLine2 || "");
      setValue("city", userData.city || "");
      setValue("state", userData.state || "");
      setValue("zipCode", userData.zipCode || "");
    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData,setValue]);

  const onSubmit = (data) => {
    setUserData({ ...userData, ...data });
    localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
    handleClick("next");
  };

  // for state
  const [state, setState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getAllState();
        if (status) {
          setState(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const stateOptions = state?.map((item) => {
    return (
      <option value={item.stateId} key={item.stateId}>
        {item.stateNameNep}
      </option>
    );
  });

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

  // for palika
  const [palika, setPalika] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getPalika();
        if (status) {
          setPalika(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const palikaOptions = palika?.map((item) => {
    return (
      <option value={item.palikaId} key={item.palikaId}>
        {item.palikaNameNep}
      </option>
    );
  });
  // for ward
  const [wardName, setWardName] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setWardName(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const wardOptions = wardName?.map((item) => {
    return (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    );
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center text-xl font-semibold text-red-500 ">
        स्थायी ठेगाना
      </div>

      {permanentAddressField.map((formField) => (
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
      ))}

      <FormControlLabel
        className="text-center bg-red-500 px-4 py-1 flex justify-center "
        {...register("status")}
        control={
          <Checkbox
            // defaultChecked={clickedIdData?.status}
            color="primary"
          />
        }
        label="स्थायी ठेगाना नै अस्थायी ठेगाना भए ?"
      />

      <div className="text-center text-xl font-semibold text-red-500 ">
        अस्थायी ठेगाना
      </div>

      {temporaryAddressField.map((formField) => (
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
      ))}

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

export default AddressDetail;
