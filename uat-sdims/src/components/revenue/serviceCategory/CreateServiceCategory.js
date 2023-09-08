import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { TextareaAutosize } from "@mui/material";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { serviceCategoryValidationResolver } from "../../../utils/validateField";
import {
  createServiceCategory,
  serviceCategory,
} from "../../../services/apiServices/revenue/serviceCategory/serviceCategoryService";
import { natureOfCategory } from "../../../services/apiServices/revenue/natureOfCategory/natureOfCategoryService";
import AddButton from "../../reusableDesign/AddButton";
export default function CreateServiceCategory({ clickedIdData }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: serviceCategoryValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      name_Eng: clickedIdData?.name_Eng,
      code: clickedIdData?.code,
      description: clickedIdData?.description,
      parentId: clickedIdData?.parentId,
      natureOfCategoryId: clickedIdData?.natureOfCategoryId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createServiceCategory(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/revenue/serviceCategory");
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
        selected={item.id === clickedIdData?.parentId}
      >
        {item.name}
      </option>
    );
  });

  // for nature of category
  const [natureOfCategoryData, setNatureOfCategoryData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await natureOfCategory();
        if (response.status === true) {
          setNatureOfCategoryData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const natureOfCategoryDataOptions = natureOfCategoryData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.natureOfCategoryId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"सेवा-वर्ग राख्नुहोस "} />
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
            <label className="label text-blue-900 "> सेवा वर्ग </label>
            <select {...register("parentId")} className="peer">
              <option value={""}> --- सेवा वर्ग छान्नुहोस् ---</option>
              {serviceCategoryOptions}
            </select>
            <p> {errors?.parentId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">श्रेणी को प्रकृति</label>
            <select {...register("natureOfCategoryId")} className="peer">
              <option value={""}>--- श्रेणी को प्रकृति छान्नुहोस् ---</option>
              {natureOfCategoryDataOptions}
            </select>
            <p> {errors?.natureOfCategoryId?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label>विवरण</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("description")}
              placeholder="write something here......"
            />
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
