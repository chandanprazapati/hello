import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { karKattiValidationResolver } from "../../../utils/validateField";
import { createKarKatti } from "../../../services/apiServices/planning/karKatti/karKattiService";

const CreateKarKatti = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: karKattiValidationResolver });

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("karKattiId", clickedIdData?.karKattiId);
    setValue("contigency", clickedIdData?.contigency);
    setValue("marmatSambhar", clickedIdData?.marmatSambhar);
    setValue("samajikSurekchya", clickedIdData?.samajikSurekchya);
    setValue("bahalKar", clickedIdData?.bahalKar);
    setValue("agrimShulka", clickedIdData?.agrimShulka);
    setValue("parishramik", clickedIdData?.parishramik);
    setValue("royality", clickedIdData?.royality);
    setValue("dhuwani", clickedIdData?.dhuwani);
  }, [clickedIdData,setValue]);

  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          createKarKatti(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/karkatti");
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
      <CommonHeaderDesign title={"कर कट्टी राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("contigency")}
              placeholder="."
            />
            <label className="label">कन्टेन्जेन्सी</label>
            <p> {errors?.contigency?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("marmatSambhar")}
              placeholder="."
            />
            <label className="label">मर्मत सम्भार </label>
            <p> {errors?.marmatSambhar?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("samajikSurekchya")}
              placeholder="."
            />
            <label className="label">सामाजिक सुरक्षा कर </label>
            <p> {errors?.samajikSurekchya?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("bahalKar")}
              placeholder="."
            />
            <label className="label">बहाल कर </label>
            <p> {errors?.bahalKar?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("agrimShulka")}
              placeholder="."
            />
            <label className="label">अग्रिम आय कर </label>
            <p> {errors?.agrimShulka?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("parishramik")}
              placeholder="."
            />
            <label className="label">पारिश्रमिक कर </label>
            <p> {errors?.parishramik?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("royality")}
              placeholder="."
            />
            <label className="label">रोयल्टी कर </label>
            <p> {errors?.royality?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("dhuwani")}
              placeholder="."
            />
            <label className="label">ढुवानी कर </label>
            <p> {errors?.dhuwani?.message}</p>
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

export default CreateKarKatti;
