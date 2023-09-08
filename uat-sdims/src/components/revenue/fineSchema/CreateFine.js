import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { fineSchemaValidationResolver } from "../../../utils/validateField";
import { createFineSchema } from "../../../services/apiServices/revenue/fineSchema/fineSchemaService";
import { taxModule } from "../../../services/apiServices/revenue/taxModule/taxModuleService";
import AddButton from "../../reusableDesign/AddButton";

const CreateFineSchema = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: fineSchemaValidationResolver });

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("name", clickedIdData?.name);
    setValue("code", clickedIdData?.code);
    setValue("penaltyPercent", clickedIdData?.penaltyPercent);
    setTaxModuleValue(clickedIdData?.taxModuleId);
  }, [clickedIdData, setValue]);

  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          taxModuleId: taxModuleValue,
        };

        try {
          createFineSchema(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/revenue/fineschema");
              return;
            } else response.status === false;
            {
              toast.error(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
            }
          });
        } catch (error) {
          toast.error(error.message);
        }
        resolve();
      }, 2000);
    });
  };

  //   for taxModuleId
  const [taxModuleId, setTaxModuleId] = useState([]);
  const [taxModuleValue, setTaxModuleValue] = useState("");

  const handleTaxModule = (e) => {
    setTaxModuleValue(e.target.value);
  };
  useEffect(() => {
    let taxModuleData = () => {
      taxModule().then((response) => {
        try {
          response.status === true;
          {
            setTaxModuleId(response.data);
          }
        } catch (error) {}
      });
    };

    taxModuleData();
  }, []);

  return (
    <>
      <CommonHeaderDesign title={"जरिवाना-योजना राख्नुहोस"} />
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
              type="number"
              className="peer"
              {...register("penaltyPercent")}
              placeholder="."
            />
            <label className="label">जरिवाना दर (%)</label>

            <p> {errors?.penaltyPercent?.message}</p>
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
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">कर मोड्युल</label>
            <select
              onChange={handleTaxModule}
              className="peer"
              required
              value={taxModuleValue}
            >
              <option disabled selected value={""}>
                ---- कर मोड्युल छान्नुहोस् ----
              </option>
              {taxModuleId.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
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

export default CreateFineSchema;
