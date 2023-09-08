import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createIndexCaseType } from "../../../../services/apiServices/legalCase/indexCaseType/indexCaseTypeService";
import { castValidateResolver } from "../../../../utils/validateField";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CreateMamila({ clickedIdData }) {
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
        const response = await createIndexCaseType(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/legalCase/mamila");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, isSubmitting]
  );

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"मामिला राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              पुरा नाम(नेपाली)
              <span className="requiredField">*</span>{" "}
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
          <FormControlLabel
            className="pl-4"
            {...register("status")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.status}
              />
            }
            label="स्थिति ?"
          />
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
