import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../reusableDesign/CommonHeaderDesign";
import SeoOptimization from "../../../reusableDesign/SeoOptimzation";
import {
  sadasyaForMelMilap,
  sanyojakForMelMilap,
  wadaMelMilap,
} from "../../../../services/apiServices/legalCase/legalCaseService";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
import AddButton from "../../../reusableDesign/AddButton";
export default function Wada({ clickedIdData }) {
  const router = useRouter();
  const { id } = router.query;
  const titleRef = React.useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: personDetailValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      wardSelected: clickedIdData?.wardSelected,
      mailmilapOne: clickedIdData?.mailmilapOne,
      mailmilapTwo: clickedIdData?.mailmilapTwo,
      mailmilapThree: clickedIdData?.mailmilapThree,
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      caseId: id,
    };

    try {
      const response = await wadaMelMilap(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/legalCase/caseDetail");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   for sanyojak
  const [sanyojak, setSanyojakData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await sanyojakForMelMilap();
        if (status) {
          setSanyojakData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const sanyojakOptions = sanyojak.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.postId}
      >
        {item.name}
      </option>
    );
  });

  //   for sadasya1
  const [sadasya, setSadasya] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await sadasyaForMelMilap();
        if (status) {
          setSadasya(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const sadasyaOptions = sadasya.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.postId}
      >
        {item.name}
      </option>
    );
  });

  //   for sadasya2
  const [sadasya2, setSadasya2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await sadasyaForMelMilap();
        if (status) {
          setSadasya2(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const sadasyaOptions2 = sadasya2.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.postId}
      >
        {item.name}
      </option>
    );
  });

  //   for ward
  const [wardData, setWardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setWardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const wardOptions = wardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.wardId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <div>
      <CommonHeaderDesign title={"वडा मिलापत्र विवरण राख्नुहोस "} />
      <SeoOptimization title={"वडा मिलापत्र "} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              वार्ड<span className="requiredField">*</span>
            </label>
            <select
              {...register("wardSelected")}
              className="peer requiredField"
            >
              <option value={""}>--- वार्ड छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.wardSelected?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              मेलमिलाप कर्ता १ (संयोजक) <span className="requiredField">*</span>
            </label>
            <select
              {...register("mailmilapOne")}
              className="peer requiredField"
            >
              <option value={""}>--- मेलमिलाप कर्ता छान्नुहोस् ---</option>
              {sanyojakOptions}
            </select>
            <p> {errors?.mailmilapOne?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              मेलमिलाप कर्ता २ (सदस्य) <span className="requiredField">*</span>
            </label>
            <select
              {...register("mailmilapTwo")}
              className="peer requiredField"
            >
              <option value={""}>--- मेलमिलाप कर्ता छान्नुहोस् ---</option>
              {sadasyaOptions}
            </select>
            <p> {errors?.mailmilapTwo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              मेलमिलाप कर्ता ३ (सदस्य) <span className="requiredField">*</span>
            </label>
            <select
              {...register("mailmilapThree")}
              className="peer requiredField"
            >
              <option value={""}>--- मेलमिलाप कर्ता छान्नुहोस् ---</option>
              {sadasyaOptions2}
            </select>
            <p> {errors?.mailmilapThree?.message}</p>
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
