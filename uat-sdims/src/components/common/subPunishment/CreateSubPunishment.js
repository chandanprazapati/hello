import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { subPunishmentValidateResolver } from "../../../utils/validateField";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { createSubPunishment } from "../../../services/apiServices/common/subPunishment/subPunishmentService";
import AddButton from "../../reusableDesign/AddButton";
import { punishment } from "../../../services/apiServices/common/punishment/punishmentService";

const CreateSubPunishment = ({ clickedIdData }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: subPunishmentValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      nameEng: clickedIdData?.nameEng,
      punishmentId: clickedIdData?.punishmentId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createSubPunishment(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/common/subPunishment");
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

  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await punishment();
        if (status) {
          setApiData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const options = apiData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.punishmentId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"उप-सजाय राख्नुहोस"} />
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
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              सजाय
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("punishmentId")}
              className="peer requiredField"
            >
              <option value={""}>------सजायको रकार छान्नुहोस्------</option>
              {options}
            </select>
            <p> {errors?.punishmentId?.message}</p>
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस्"}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};

export default CreateSubPunishment;
