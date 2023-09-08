import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../../components/reusableDesign/AddButton";
import { createAttOffice } from "../../../../../services/apiServices/common/attOffice/attOfficeService";
import { kajTypeValidateResolver } from "../../../../../utils/validateField";
import SeoOptimization from "../../../../../components/reusableDesign/SeoOptimzation";

export default function Index({ clickedIdData }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: kajTypeValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      name_Eng: clickedIdData?.name_Eng,
      code: clickedIdData?.code,
      address: clickedIdData?.address,
      phoneNo: clickedIdData?.phoneNo,
      attOfficeTypeId: clickedIdData?.attOfficeTypeId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        const response = await createAttOffice(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/common/attOffice");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router]
  );

  // attOffice
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await attOfficeType();
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
        selected={item.id === clickedIdData?.attOfficeTypeId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
    <SeoOptimization title={"नियुक्ति पत्र  "} />
      <CommonHeaderDesign title={"नियुक्ति पत्र  राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name")}
              placeholder="."
            />
            <label className="label">Name1</label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name_Eng")}
              placeholder="."
            />
            <label className="label">Name2</label>
            <p> {errors?.name_Eng?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("code")}
              placeholder="."
            />
            <label className="label">Name3</label>
            <p> {errors?.code?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
            वार्ड
            </label>
            <select {...register("attOfficeTypeId")} className="peer">
              <option value={""}>
                ------ वार्ड चयन गर्नुहोस् ------
              </option>
              {options}
            </select>
           <p> {errors?.attOfficeTypeId?.message}</p>
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          isSubmitting={isSubmitting}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}

