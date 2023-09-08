import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { shrediValidateResolver } from "../../../utils/validateField";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { rajPatrankitSheni } from "../../../services/apiServices/common/rajPatrankitSheni/rajPatrankitSheniService";
import { createShredi } from "../../../services/apiServices/common/shredi/shrediService";
import AddButton from "../../reusableDesign/AddButton";

export default function CreateShredi({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: shrediValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      rajPatrankitSheniId: clickedIdData?.rajPatrankitSheniId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createShredi(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/common/shredi");
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
  // for rajPatrankitSheni
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await rajPatrankitSheni();
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
        selected={item.id === clickedIdData?.rajPatrankitSheniId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"श्रेणी राख्नुहोस"} />
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
            <label className="label text-blue-900 ">
              rajPatrankitSheni
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("rajPatrankitSheniId")}
              className="peer requiredField"
            >
              <option value={""}>---Select The Rajpatrankitsheni---</option>

              {options}
            </select>
            <p> {errors?.rajPatrankitSheniId?.message}</p>
          </div>
        </div>

        <AddButton
          icon={<FaPlus />}
          disabled={isSubmitting}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        />
      </form>
    </>
  );
}
