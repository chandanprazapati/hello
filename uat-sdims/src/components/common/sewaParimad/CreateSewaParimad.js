import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { rajPatrankitSheniValidateResolver } from "../../../utils/validateField";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { createSewaParimad } from "../../../services/apiServices/common/sewaParimad/sewaParimad";
import AddButton from "../../reusableDesign/AddButton";

export default function CreateSewaParimad({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: rajPatrankitSheniValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createSewaParimad(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/common/sewaParimad");
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
      <CommonHeaderDesign title={"सेवा परिमाड राख्नुहोस"} />
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
        </div>
        <AddButton
          icon={<FaPlus />}
          disabled={isSubmitting}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        />
      </form>
    </React.Fragment>
  );
}
