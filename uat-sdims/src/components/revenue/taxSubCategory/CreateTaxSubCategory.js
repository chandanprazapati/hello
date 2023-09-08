import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { taxSubCategoryValidateResolver } from "../../../utils/validateField";
import { taxCategory } from "../../../services/apiServices/revenue/taxCategory/taxCategoryService";
import { createTaxSubCategory } from "../../../services/apiServices/revenue/taxSubCategory/taxSubCategoryServices";
import AddButton from "../../reusableDesign/AddButton";

const CreateTaxSubCategory = ({ clickedIdData }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: taxSubCategoryValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      name_Eng: clickedIdData?.name_Eng,
      code: clickedIdData?.code,
      taxCategoryId: clickedIdData?.taxCategoryId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createTaxSubCategory(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/revenue/taxSubCategory");
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

  // for taxCategory
  const [taxCategoryData, setTaxCategoryData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await taxCategory();
        if (response.status === true) {
          setTaxCategoryData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const taxCategoryOptions = taxCategoryData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.taxCategoryId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"कर-उपवर्ग राख्नुहोस "} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">कर वर्ग </label>
            <select className="peer" {...register("taxCategoryId")}>
              <option disabled selected value={""}>
                ---- कर वर्ग छान्नुहोस् ----
              </option>
              {taxCategoryOptions}
            </select>
            <p> {errors?.taxCategoryId?.message}</p>
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
            <label className="label">कोड</label>
            <p> {errors?.code?.message}</p>
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
export default CreateTaxSubCategory;
