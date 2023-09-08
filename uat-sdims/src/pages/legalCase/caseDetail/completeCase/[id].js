import React, { useRef, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import { completeCase, firtaAadesh } from "../../../../services/apiServices/legalCase/legalCaseService";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
const aa = new BikramSambat(new Date()).toBS();


export default function FirtaAadeshById() {
  const titleRef = useRef(null);
  const router = useRouter();
    const { query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    data = {
        ...data,
        caseId: query.id,
        judgeFinalDecisionDate: judgeFinalDecisionDate,
    };
    try {
      const response = await completeCase(data);
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
  const [judgeFinalDecisionDate, setJudgeFinalDecisionDate] = useState(aa);


  return (
    <div>
      <SeoOptimization title={"उजुरी/विवाद सम्पन्न "} />
      <CommonHeaderDesign title={"उजुरी/विवाद सम्पन्न विवरण  थप्नुहोस  "} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className="grid lg:grid-cols-2  gap-5 px-5  py-2 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">न्यायधिसको निर्णय <span className="requiredField">*</span> </label> 

            <TextareaAutosize
              type="string"
              className="border-2  pb-6 border-black"
              {...register("judgeDecisionFinal")}
              placeholder="write something here......"
              minRows={2} // Minimum number of rows
              style={{ width: "500px" }} // Set the desired width using inline styles
            />
          </div>

       <div className=" pt-14" >
       <div className="relative  w-full mb-6 group  ">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              निर्णय को मिति
            </label>

            <NepaliDatePicker
              value={judgeFinalDecisionDate}
              className="peer "
              onChange={(e) => setJudgeFinalDecisionDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
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
