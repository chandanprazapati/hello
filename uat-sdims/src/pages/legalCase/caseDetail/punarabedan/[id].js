import React, { useRef, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import { punarabedan } from "../../../../services/apiServices/legalCase/legalCaseService";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
const aa = new BikramSambat(new Date()).toBS();

export default function PunarabedanById() {
  const titleRef = useRef(null);
  const router = useRouter();
  const { query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const onSubmit = async (data) => {
    data = {
      ...data,
      caseId: query.id,
      punarabedanDate: punarabedanDate,
      punarabedanCourtSendDate: punarabedanCourtSendDate,
      misilFirtaMiti: misilFirtaMiti,
    };
    try {
      const response = await punarabedan(data);
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

  // For date picker
  const [punarabedanDate, setPunarabedanDate] = useState(aa);
  const [punarabedanCourtSendDate, setPunarabedanCourtSendDate] = useState(aa);
  const [misilFirtaMiti, setMisilFirtaMiti] = useState(aa);

  return (
    <div>
      <SeoOptimization title={"पुनरावेदन  "} />
      <CommonHeaderDesign title={" पुनरावेदन  विवरण  थप्नुहोस  "} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10  py-2 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative  w-full mb-6 group  ">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              पुनरावेदन परेको मिति
            </label>

            <NepaliDatePicker
              value={punarabedanDate}
              className="peer "
              onChange={(e) => setPunarabedanDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("punarabedanCourt")}
              placeholder="."
            />
            <label className="label">
              पुनरावेदन सुन्ने अदालत
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.punarabedanCourt?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group  ">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              पुनरावेदन सुन्ने अदालतमा पठाएको मिति
            </label>

            <NepaliDatePicker
              value={punarabedanCourtSendDate}
              className="peer "
              onChange={(e) => setPunarabedanCourtSendDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("punarabedanDartaName")}
              placeholder="."
            />
            <label className="label">
              दर्ता गर्ने अधिकारीको नामथर
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.punarabedanDartaName?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group  ">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              मिसिल फिर्ता मिति
            </label>

            <NepaliDatePicker
              value={misilFirtaMiti}
              className="peer "
              onChange={(e) => setMisilFirtaMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">कैफियत</label>

            <TextareaAutosize
              type="string"
              className="border-2  pb-6 border-black"
              {...register("punarabedanRemarks")}
              placeholder="write something here......"
              minRows={2} // Minimum number of rows
              style={{ width: "500px" }} // Set the desired width using inline styles
            />
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
