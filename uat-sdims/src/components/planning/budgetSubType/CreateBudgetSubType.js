import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { createBudgetSubType } from "../../../services/apiServices/planning/budgetSubType/budgetSubTypeService";
import { budgetType } from "../../../services/apiServices/planning/budgetType/budgetTypeService";

const CreateBudgetSubTypeX = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("amount", clickedIdData?.amount);
    setValue("budgetSubTypeName", clickedIdData?.budgetSubTypeName);
    setBudgetTypeId(clickedIdData?.budgetTypeId);
  }, [clickedIdData,setValue]);

  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (budgetTypeId === null) {
          toast.error("बजेटको नाम छान्नुहोस्", {
            icon: "🚀",
            autoClose: 1000,
          });
          return;
        } else {
          data = {
            ...data,
            budgetTypeId: budgetTypeId,
          };
        }
        try {
          createBudgetSubType(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/budgetsubtype");
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

  const [budgetTypeId, setBudgetTypeId] = useState(null);

  const handleBudgetType = (e) => {
    setBudgetTypeId(e.target.value);
  };

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    let budgetTypeApiData = () => {
      budgetType().then((response) => {
        try {
          response.status === true;
          {
            setApiData(response.data);
          }
        } catch (error) {}
      });
    };
    budgetTypeApiData();
  }, [setApiData]);

  return (
    <>
      <CommonHeaderDesign title={"बजेट उप प्रकार राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">बजेटको प्रकार नाम </label>
            <select
              onChange={handleBudgetType}
              value={budgetTypeId}
              className="peer"
            >
              <option value={null}>--- बजेटको प्रकार नाम छान्नुहोस् ---</option>
              {apiData.map((items, index) => {
                return (
                  <>
                    <option value={items.budgetTypeId} key={index}>
                      {items.budgetTypeName}
                    </option>
                  </>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("budgetSubTypeName")}
              placeholder="."
            />
            <label className="label">Name(नेपाली)</label>
            <p> {errors?.budgetSubTypeName?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("amount")}
              placeholder="."
            />
            <label className="label">रकम</label>
            <p> {errors?.amount?.message}</p>
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

export default CreateBudgetSubTypeX;
