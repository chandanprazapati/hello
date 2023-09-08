import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { attOfficeType } from "../../../services/apiServices/common/attOfficeType/attOfficeTypeService";
import { createAttOffice } from "../../../services/apiServices/common/attOffice/attOfficeService";
import { kajTypeValidateResolver } from "../../../utils/validateField";

export default function CreateAttOffice({ clickedIdData }) {
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
      <CommonHeaderDesign title={"कार्यालयको हाजिरी  राख्नुहोस"} />
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
              नाम(नेपाली)
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name_Eng")}
              placeholder="."
            />
            <label className="label">Name(English)</label>
            <p> {errors?.name_Eng?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("code")}
              placeholder="."
            />
            <label className="label">कोड</label>
            <p> {errors?.code?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("address")}
              placeholder="."
            />
            <label className="label">
              ठेगाना
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.address?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("phoneNo")}
              placeholder="."
            />
            <label className="label">
              फोन न.
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.phoneNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              कार्यालयको हाजिरी प्रकार
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("attOfficeTypeId")}
              className="peer requiredField"
            >
              <option value={""}>
                --- कार्यालयको हाजिरी प्रकार चयन गर्नुहोस् ---
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
