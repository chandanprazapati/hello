import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {  TextareaAutosize } from "@mui/material";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
import { castValidateResolver } from "../../../../utils/validateField";
import { createPostApi } from "../../../../services/apiServices/legalCase/legalCaseService";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
const aa = new BikramSambat(new Date()).toBS();

export default function Index({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: castValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      nameEng: clickedIdData?.nameEng,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createPostApi(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/visitor/todayVisitorDetails");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, isSubmitting]
  );

    // For date picker
    const [dartaMiti, setDartaMiti] = useState(aa);
  
    useEffect(() => {
      if (clickedIdData) {
        setDartaMiti(clickedIdData?.janmaMiti || aa);
      }
    }, [clickedIdData]);
  

  return (
    <React.Fragment>
      <SeoOptimization title="आजको भेटघाटको " />
      <CommonHeaderDesign title={"नया (VIP) भेटघाट दर्ता गर्नुहोस्"} />
      <form onSubmit={handleSubmit(onSubmit)}>
       
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
       
        <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              भेट्ने मिति
            </label>

            <NepaliDatePicker
              value={dartaMiti}
              className="peer "
              onChange={(e) => setDartaMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="time"
              className="peer requiredField "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              भेट्ने समय
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.name?.message}</p>
          </div>
       
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              आगन्तुक नाम
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              भेट्नु पर्ने व्यक्ति नाम
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.name?.message}</p>
          </div>

         

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              मोबाइल नं.
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              संस्था/ठाउँ
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="time"
              className="peer requiredField "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              भेट्ने समय
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              className="peer  "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
            डकुमेन्ट अपलोड
             
            </label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label>कैफियत</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("remarks")}
              placeholder="write something here......"
            />
          </div>

       
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </React.Fragment>
  );
}
