import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { castValidateResolver } from "../../../utils/validateField";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { createOccupation } from "../../../services/apiServices/common/occupation/occupationService";
import AddButton from "../../reusableDesign/AddButton";

export default function CreateOccupation({ clickedIdData }) {
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
        const response = await createOccupation(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/common/occupation");
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
      <CommonHeaderDesign title={"पेशा राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              Name(नेपाली)
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.name?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nameEng")}
              placeholder="."
            />
            <label className="label">Name(English)</label>
            <p> {errors?.nameEng?.message}</p>
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : " सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </React.Fragment>
  );
}
