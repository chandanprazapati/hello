import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { buildingTypeValidationResolver } from "../../../utils/validateField";
import { createVehicleType } from "../../../services/apiServices/revenue/vehicleType/vehicleTypeService";
import AddButton from "../../reusableDesign/AddButton";

export default function CreateVehicleType({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: buildingTypeValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      name_Eng: clickedIdData?.name_Eng,
      code: clickedIdData?.code,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createVehicleType(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/revenue/vehicle");
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
    <>
      <CommonHeaderDesign title={"वाहन-प्रकार राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name")}
              placeholder="."
            />
            <label className="label">Name(नेपाली)</label>
            <p> {errors?.name?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name_Eng")}
              placeholder="."
            />
            <label className="label">Name(English)(optional)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("code")}
              placeholder="."
            />
            <label className="label">Code</label>
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}
