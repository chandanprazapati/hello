import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { taxCategoryValidateResolver } from "../../../utils/validateField";
import { taxModule } from "../../../services/apiServices/revenue/taxModule/taxModuleService";
import { createTaxCategory } from "../../../services/apiServices/revenue/taxCategory/taxCategoryService";
import AddButton from "../../reusableDesign/AddButton";

export default function CreateTaxCategory({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: taxCategoryValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      name_Eng: clickedIdData?.name_Eng,
      code: clickedIdData?.code,
      taxModuleId: clickedIdData?.taxModuleId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createTaxCategory(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/revenue/taxCategory");
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

  // post
  const [taxModuleData, setTaxModuleData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await taxModule();
        if (status) {
          setTaxModuleData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const taxModuleOptions = taxModuleData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.taxModuleId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"कर-वर्ग राख्नुहोस "} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">कर मोड्युल</label>
            <select {...register("taxModuleId")} className="peer">
              <option value={""}>---- कर मोड्युल छान्नुहोस् ----</option>
              {taxModuleOptions}
            </select>
            <p> {errors?.taxModuleId?.message}</p>
          </div>
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
            <label className="label">Name(English)(Optional)</label>
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
