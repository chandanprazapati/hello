import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { createThekkaKarKatti } from "../../../services/apiServices/planning/thekkaKarKatti/thekkaKarKattiService";

const CreateThekkaKarKatti = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("thekkaKarKattiId", clickedIdData?.thekkaKarKattiId);
    setValue("vat", clickedIdData?.vat);
    setValue("mobilization", clickedIdData?.mobilization);
    setValue("dharauti", clickedIdData?.dharauti);
    setValue("aayaKar", clickedIdData?.aayaKar);
  }, [clickedIdData, setValue]);

  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          createThekkaKarKatti(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/thekkakarkatti");
              return;
            } else response.status === false;
            {
              toast.error(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
            }
            return;
          });
        } catch (error) {
          toast.error(error.message);
        }
        resolve();
      }, 2000);
    });
  };

  return (
    <>
      <CommonHeaderDesign title={"ठेक्का कर कट्टी राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("mobilization")}
              placeholder="."
            />
            <label className="label">परिचालन कर(%) </label>
            <p> {errors?.mobilization?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("vat")}
              placeholder="."
            />
            <label className="label">भ्याट(%) </label>
            <p> {errors?.vat?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("dharauti")}
              placeholder="."
            />
            <label className="label">धरौटी कर(%) </label>
            <p> {errors?.dharauti?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("aayaKar")}
              placeholder="."
            />
            <label className="label">अग्रिम आय कर(%) </label>
            <p> {errors?.aayaKar?.message}</p>
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
};

export default CreateThekkaKarKatti;
