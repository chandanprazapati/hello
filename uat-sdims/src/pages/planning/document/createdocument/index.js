


import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { createDocumentType } from "../../../../services/apiServices/planning/documentType/documentTypeService";

const CreateDocs = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("documentTypeId", clickedIdData?.documentTypeId);
    setValue("documentTypeName", clickedIdData?.documentTypeName);
  }, [clickedIdData,setValue]);

  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          createDocumentType(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/document");
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
      <CommonHeaderDesign title={"कागजातको प्रकार राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("documentTypeName")}
              placeholder="."
            />
            <label className="label">कागजात प्रकार
            <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.documentTypeName?.message}</p>
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

export default CreateDocs;
