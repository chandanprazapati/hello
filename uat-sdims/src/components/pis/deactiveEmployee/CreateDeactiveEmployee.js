import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
const BS = require("bikram-sambat-js");
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
import { sewaParimad } from "../../../services/apiServices/common/sewaParimad/sewaParimad";
import { createDeactiveEmployee } from "../../../services/apiServices/pis/deactiveEmployee/deactiveEmployeeService";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { deactiveEmployeeValidateResolver } from "../../../utils/validateField";
import { englishToNepali } from "../../../utils/utility";
const aa = new BikramSambat(new Date()).toBS();
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
export default function CreateDeactiveEmployee({ clickedIdData }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: deactiveEmployeeValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      employeeId: clickedIdData?.employeeId,
      deactiveSewaparimanId: clickedIdData?.deactiveSewaparimanId,
    },
  });

  const router = useRouter();

  const onSubmit = useCallback(
    async (data) => {
      data = {
        ...data,
        deactiveDateNep: deactiveDateNep,
      };
      try {
        if (isSubmitting) return;
        const response = await createDeactiveEmployee(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/pis/deactiveEmployee");
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

  // for employee
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await employee();
        if (response.status === true) {
          setEmployeeData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const employeeOptions = employeeData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.employeeId}
      >
        {item.firstName} {item.middleName} {item.lastName} [
        {englishToNepali(item.empCode)}]
      </option>
    );
  });

  // for sewa pariman
  const [sewaParimanData, setSewaParimanData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sewaParimad();
        if (response.status === true) {
          setSewaParimanData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const sewaParimanOptions = sewaParimanData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.deactiveSewaparimanId}
      >
        {item.name}
      </option>
    );
  });

  // for date
  const [deactiveDateNep, setDeactiveDateNep] = useState(aa);
  useEffect(() => {
    if (clickedIdData) {
      setDeactiveDateNep(clickedIdData?.deactiveDateNep || aa);
    }
  }, [clickedIdData]);

  return (
    <>
      <CommonHeaderDesign title={"निष्क्रिय कर्मचारी विवरण थप्नुहोस्"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              कर्मचारी
              <span className="requiredField">*</span>
            </label>
            <select {...register("employeeId")} className="peer requiredField">
              <option value={""}>--- कर्मचारी छान्नुहोस् ---</option>
              {employeeOptions}
            </select>
            <p> {errors?.employeeId?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              निस्कृय सेवा परिमान
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("deactiveSewaparimanId")}
              className="peer requiredField"
            >
              <option value={""}>--- निस्कृय सेवा परिमान छान्नुहोस् ---</option>
              {sewaParimanOptions}
            </select>
            <p> {errors?.deactiveSewaparimanId?.message} </p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              निस्कृय मिति
            </label>

            <NepaliDatePicker
              value={deactiveDateNep}
              className="peer"
              onChange={(e) => setDeactiveDateNep(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>

        <AddButton
          icon={<FaPlus />}
          disabled={isSubmitting}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        />
      </form>
    </>
  );
}
