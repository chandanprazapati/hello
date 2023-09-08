import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../reusableDesign/CommonHeaderDesign";
import { serviceRateValidationResolver } from "../../../../utils/validateField";
import { fiscal } from "../../../../services/apiServices/common/fiscal/fiscalService";
import "nepali-datepicker-reactjs/dist/index.css";
import { service } from "../../../../services/apiServices/revenue/service/serviceService";
import { createServiceRate } from "../../../../services/apiServices/revenue/serviceRate/serviceRateService";
import AddButton from "../../../reusableDesign/AddButton";

const CreateServiceRate = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: serviceRateValidationResolver });

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("fiscalYearId", clickedIdData?.fiscalYearId);
    setValue("serviceId", clickedIdData?.serviceId);
    setValue("ratePerQuantity", clickedIdData?.ratePerQuantity);
    setValue("taxPercentage", clickedIdData?.taxPercentage);
    setValue("openningBalance", clickedIdData?.openningBalance);
    setFiscalValue(clickedIdData?.fiscalYearId);
    setServiceValue(clickedIdData?.serviceId);
  }, [clickedIdData, setValue]);

  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          fiscalYearId: fiscalValue,
          serviceId: serviceValue,
        };
        try {
          createServiceRate(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/revenue/servicerate");
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
        } catch (error) {}
        resolve();
      }, 2000);
    });
  };
  //   for fiscalyearId
  const [fiscalId, setFiscalId] = useState([]);
  const [fiscalValue, setFiscalValue] = useState("");

  const handleFiscal = (e) => {
    setFiscalValue(e.target.value);
  };
  useEffect(() => {
    let fiscalYearId = () => {
      fiscal(0).then((response) => {
        try {
          response.status === true;
          {
            setFiscalId(response.data);
          }
        } catch (error) {}
      });
    };

    fiscalYearId();
  }, []);

  //   for serviceId
  const [serviceId, setServiceId] = useState([[]]);
  const [serviceValue, setServiceValue] = useState("");

  const handleService = (e) => {
    setServiceValue(e.target.value);
  };
  useEffect(() => {
    let clickedServiceId = () => {
      service().then((response) => {
        try {
          response.status === true;
          {
            setServiceId(response.data);
          }
        } catch (error) {}
      });
    };

    clickedServiceId();
  }, []);
  return (
    <>
      <CommonHeaderDesign title={"आम्दानी दर राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">आर्थिक वर्ष</label>
            <select
              onChange={handleFiscal}
              value={fiscalValue}
              className="peer"
              required
            >
              <option value={""} selected disabled>
                ---- आर्थिक वर्ष छान्नुहोस् ----
              </option>

              {fiscalId.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">सेवा</label>
            <select
              onChange={handleService}
              className="peer"
              value={serviceValue}
              required
            >
              <option disabled selected value={""}>
                ---- सेवा छान्नुहोस् ----
              </option>
              {serviceId.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("ratePerQuantity")}
              placeholder="."
            />
            <label className="label">दर प्रति मात्रा</label>
            <p> {errors?.ratePerQuantity?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("taxPercentage")}
              placeholder="."
            />
            <label className="label">दर (%)</label>

            <p> {errors?.taxPercentage?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("openningBalance")}
              placeholder="."
            />
            <label className="label">सुरुको मौज्दात</label>
            <p> {errors?.openningBalance?.message}</p>
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
export default CreateServiceRate;
