import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { taxModuleValidationResolver } from "../../../utils/validateField";
import { createTaxModule } from "../../../services/apiServices/revenue/taxModule/taxModuleService";
import { service } from "../../../services/apiServices/revenue/service/serviceService";
import AddButton from "../../reusableDesign/AddButton";

const CreateTaxModule = ({ clickedIdData }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: taxModuleValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      name_Eng: clickedIdData?.name_Eng,
      code: clickedIdData?.code,
      alias: clickedIdData?.alias,
      serviceId: clickedIdData?.serviceId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createTaxModule(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/revenue/taxModule");
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

  // for service
  const [serviceData, setServiceData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service();
        if (response.status === true) {
          setServiceData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const serviceOptions = serviceData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.serviceId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"कर मोड्युल राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">सेवाहरू</label>
            <select {...register("serviceId")} className="peer">
              <option disabled selected value={""}>
                ---- सेवा छान्नुहोस् ----
              </option>
              {serviceOptions}
            </select>
            <p>{errors?.serviceId?.message}</p>
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
            <label className="label">Name(English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("alias")}
              placeholder="."
            />
            <label className="label">Alias Code</label>
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
};

export default CreateTaxModule;
