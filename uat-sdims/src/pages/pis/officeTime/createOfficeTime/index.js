import { yupResolver } from "@hookform/resolvers/yup";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import * as yup from "yup";
const BS = require("bikram-sambat-js");
import BikramSambat from "bikram-sambat-js";
import AddButton from "@/components/reusableDesign/AddButton";
import CommonHeaderDesign from "@/components/reusableDesign/CommonHeaderDesign";
import SeoOptimization from "@/components/reusableDesign/SeoOptimzation";
import { TimeSpanTimeOnly } from "@/utils/utility";
import { createOfficeTime } from "../../../../services/apiServices/pis/officeTime/officeTimeService";

export default function Index({ clickedIdData }) {
  const aa = new BikramSambat(new Date()).toBS();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  //   {
  //     resolver: yupResolver(
  //       yup.object().shape({
  //         startDate: yup.date().min(new Date("1950-01-01")).required(),
  //         endDate: yup.date().min(new Date("1950-01-01")).required(),
  //         startTime: yup.string().required(),
  //         endTime: yup.string().required(),
  //       })
  //     ),
  //   }

  const onSubmit = async (data) => {
    data = {
      ...data,
      startDate: startDate,
      endDate: endDate,
    };
    try {
      const response = await createOfficeTime(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/pis/officeTime");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   for date picker
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    if (clickedIdData) {
      setStartDate(BS.ADToBS(clickedIdData.startDate || aa));
      setEndDate(BS.ADToBS(clickedIdData.endDate || aa));
      setValue("startTime", TimeSpanTimeOnly(clickedIdData.startTime));
      setValue("endTime", TimeSpanTimeOnly(clickedIdData.endTime));
    }
  }, [clickedIdData, setValue]);

  return (
    <React.Fragment>
      <SeoOptimization title={"कार्यालयको समय"} />
      <CommonHeaderDesign title={"कार्यालयको हाजिरी  राख्नुहोस"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              सूरु मिति
            </label>

            <NepaliDatePicker
              value={startDate}
              className="peer"
              onChange={(e) => setStartDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
            <p> {errors?.startDate?.message}</p>
          </div>
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              अन्त्य मिति
            </label>

            <NepaliDatePicker
              value={endDate}
              className="peer"
              onChange={(e) => setEndDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />

            <p> {errors?.endDate?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="time" className="peer" {...register("startTime")} />
            <label className="label">पुरादिन सुरु समय</label>
            <p> {errors?.startTime?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="time" className="peer" {...register("endTime")} />
            <label className="label">पुरादिन अन्त्य समय</label>
            <p> {errors?.endTime?.message}</p>
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        />
      </form>
    </React.Fragment>
  );
}
