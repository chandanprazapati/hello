import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { createComplaintSensitivityService } from "../../../services/apiServices/complaint/complaintSensitivity/complaintSensitivityService";
import AddButton from "../../reusableDesign/AddButton";

export default function CreateComplaintSensitivity({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      id: clickedIdData?.id,
      complaintSensitivityName: clickedIdData?.complaintSensitivityName,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createComplaintSensitivityService(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/complaint/complaintSensitivity");
        } else if (response.status === false) {
          toast.error(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, isSubmitting]
  );

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"गुनासो संवेदनशीलता राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("complaintSensitivityName")}
              placeholder="."
            />
            <label className="label">Name(नेपाली)</label>
            <p> {errors?.complaintSensitivityName?.message}</p>
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
