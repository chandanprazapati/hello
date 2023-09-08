import React, { useRef } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import { firtaAadesh } from "../../../../services/apiServices/legalCase/legalCaseService";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
    };
    try {
      const response = await firtaAadesh(data);
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
  return (
    <div>
      <SeoOptimization title={"फिर्ता आदेश "} />
      <CommonHeaderDesign title={"फिर्ता आदेश थप्नुहोस  "} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className="grid lg:grid-cols-2  gap-5 px-5  py-2 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">आदेश <span className="requiredField">*</span> </label> 

            <TextareaAutosize
              type="string"
              className="border-2  pb-6 border-black"
              {...register("firtaAdesh")}
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
