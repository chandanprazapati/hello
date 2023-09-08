import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { serviceValidationResolver } from "../../../utils/validateField";
import { createService } from "../../../services/apiServices/revenue/service/serviceService";
import { serviceCategory } from "../../../services/apiServices/revenue/serviceCategory/serviceCategoryService";
import AddButton from "../../reusableDesign/AddButton";

export default function CreateService({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: serviceValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      name_Eng: clickedIdData?.name_Eng,
      code: clickedIdData?.code,
      serviceCategoryId: clickedIdData?.serviceCategoryId,
    },
  });

  // for serviceCategory
  const [serviceCategoryData, setServiceCategoryData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serviceCategory();
        if (response.status === true) {
          setServiceCategoryData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const serviceCategoryOptions = serviceCategoryData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.serviceCategoryId}
      >
        {item.name}
      </option>
    );
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createService(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/revenue/service");
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
      <CommonHeaderDesign title={"सेवा राख्नुहोस "} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
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
            <label className="label">कोड</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">सेवा वर्ग</label>
            <select {...register("serviceCategoryId")} className="peer">
              <option value={""}>---- सेवा वर्ग छान्नुहोस् ----</option>
              {serviceCategoryOptions}
            </select>
            <p> {errors?.serviceCategoryId?.message}</p>
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
